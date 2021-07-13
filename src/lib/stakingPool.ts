import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { TransactionResponse, Web3Provider } from '@ethersproject/providers'
import BRIDGE_ABI from '../artifacts/BridgeToken.json'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { abi as LM_ABI } from '../artifacts/UnipoolVested.json'
import { config, MAINNET_CONFIG, NETWORKS_CONFIG } from '../configuration'
import { getEthPrice } from './ethPrice'
import { StakePoolInfo, StakeUserInfo } from '../types/poolInfo'
import { networkProviders } from './networkProvider'

const toBigNumber = (eb: ethers.BigNumber): BigNumber =>
	new BigNumber(eb.toString())

export const fetchStakePoolInfo = async (
	poolAddress: string,
	lmAddress: string,
	network: number,
	hasLiquidityPool: boolean,
): Promise<StakePoolInfo> => {
	if (!hasLiquidityPool) return

	const provider = networkProviders[network]
	const poolContract = new Contract(poolAddress, UNI_ABI, provider)
	const lmContract = new Contract(lmAddress, LM_ABI, provider)

	const [reserves, _token0, _totalSupply, _rewardRate, _ethPrice]: [
		Array<ethers.BigNumber>,
		string,
		ethers.BigNumber,
		ethers.BigNumber,
		BigNumber,
	] = await Promise.all([
		poolContract.getReserves(),
		poolContract.token0(),
		lmContract.totalSupply(),
		lmContract.rewardRate(),
		getEthPrice(),
	])

	const [_reserve0, _reserve1] = reserves
	let reserve: BigNumber
	let tokenPrice: BigNumber
	if (_token0.toLowerCase() === MAINNET_CONFIG.TOKEN_ADDRESS.toLowerCase()) {
		reserve = toBigNumber(_reserve0)
		tokenPrice = _ethPrice
			.times(_reserve1.toString())
			.div(_reserve0.toString())
	} else {
		reserve = toBigNumber(_reserve1)
		tokenPrice = _ethPrice
			.times(_reserve0.toString())
			.div(_reserve1.toString())
	}

	const lp = toBigNumber(_totalSupply)
		.times(reserve)
		.times(2)
		.div(10 ** 18)

	const APR = _totalSupply.isZero()
		? null
		: toBigNumber(_rewardRate).times('31536000').times('100').div(lp)

	return {
		tokensInPool: toBigNumber(_totalSupply),
		tokensInPoolUSD: lp.times(tokenPrice),
		stakedLpTokens: 0,
		APR,
		tokenPrice,
		earned: { amount: new BigNumber(0), token: 'NODE' },
	}
}

export const fetchUserInfo = async (
	address: string,
	poolAddress: string,
	lmAddress: string,
	network: number,
): Promise<StakeUserInfo> => {
	const provider = networkProviders[network]

	let validAddress = ''
	try {
		validAddress = ethers.utils.getAddress(address)
	} catch (_) {
		return {
			earned: { amount: new BigNumber(0), token: config.TOKEN_NAME },
			stakedLpTokens: 0,
		}
	}

	const lmContract = new Contract(lmAddress, LM_ABI, provider)
	const poolContract = new Contract(poolAddress, UNI_ABI, provider)

	const [stakedLpTokens, earned, notStakedLpTokens] = await Promise.all([
		lmContract.balanceOf(validAddress),
		lmContract.earned(validAddress),
		poolContract.balanceOf(validAddress),
	])

	return {
		stakedLpTokens: new BigNumber(ethers.utils.formatEther(stakedLpTokens)),
		earned: {
			amount: new BigNumber(ethers.utils.formatEther(earned)),
			token: config.TOKEN_NAME,
		},
		notStakedLpTokens: notStakedLpTokens.toString(),
	}
}

async function permitTokensMainnet(provider, poolAddress, lmAddress, amount) {
	const signer = provider.getSigner()
	const signerAddress = await signer.getAddress()

	const poolContract = new Contract(poolAddress, UNI_ABI, signer)

	const domain = {
		name: await poolContract.name(),
		version: '1',
		chainId: provider.network.chainId,
		verifyingContract: poolAddress,
	}

	// The named list of all type definitions
	const types = {
		Permit: [
			{ name: 'owner', type: 'address' },
			{ name: 'spender', type: 'address' },
			{ name: 'value', type: 'uint256' },
			{ name: 'nonce', type: 'uint256' },
			{ name: 'deadline', type: 'uint256' },
		],
	}

	// The data to sign
	const value = {
		owner: signerAddress,
		spender: lmAddress,
		value: amount,
		nonce: await poolContract.nonces(signerAddress),
		deadline: ethers.constants.MaxUint256,
	}

	// eslint-disable-next-line no-underscore-dangle
	const rawSignature = await signer._signTypedData(domain, types, value)
	const signature = ethers.utils.splitSignature(rawSignature)

	const rawPermitCall = await poolContract.populateTransaction.permit(
		signerAddress,
		lmAddress,
		amount,
		ethers.constants.MaxUint256,
		signature.v,
		signature.r,
		signature.s,
	)

	return rawPermitCall
}

async function permitTokensXDai(provider, poolAddress, lmAddress) {
	const signer = provider.getSigner()
	const signerAddress = await signer.getAddress()

	const poolContract = new Contract(poolAddress, BRIDGE_ABI, signer)

	const domain = {
		name: await poolContract.name(),
		version: '1',
		chainId: provider.network.chainId,
		verifyingContract: poolContract.address,
	}

	// The named list of all type definitions
	const types = {
		Permit: [
			{ name: 'holder', type: 'address' },
			{ name: 'spender', type: 'address' },
			{ name: 'nonce', type: 'uint256' },
			{ name: 'expiry', type: 'uint256' },
			{ name: 'allowed', type: 'bool' },
		],
	}

	const nonce = await poolContract.nonces(signerAddress)
	const expiry = Math.floor(Date.now() / 1000) + 3600
	const value = {
		holder: signerAddress,
		spender: lmAddress,
		nonce,
		expiry,
		allowed: true,
	}

	// eslint-disable-next-line no-underscore-dangle
	const rawSignature = await signer._signTypedData(domain, types, value)
	const sign = ethers.utils.splitSignature(rawSignature)

	const rawPermitCall = await poolContract.populateTransaction.permit(
		signerAddress,
		lmAddress,
		nonce,
		expiry,
		true,
		sign.v,
		sign.r,
		sign.s,
	)

	return rawPermitCall
}

export async function stakeTokens(
	amount: string,
	poolAddress: string,
	lmAddress: string,
	provider: Web3Provider,
): Promise<TransactionResponse> {
	if (amount === '0') return

	const signer = provider.getSigner()

	const lmContract = new Contract(lmAddress, LM_ABI, signer)

	const rawPermitCall =
		provider.network.chainId === 4
			? await permitTokensMainnet(
					provider,
					poolAddress,
					lmAddress,
					amount,
			  )
			: await permitTokensXDai(provider, poolAddress, lmAddress)

	const txResponse: TransactionResponse = await lmContract
		.connect(signer)
		.stakeWithPermit(
			ethers.BigNumber.from(amount.toString()),
			rawPermitCall.data,
		)

	// eslint-disable-next-line no-console
	console.log('stakeWithPermit txResponse', txResponse)

	return txResponse
}

export const harvestTokens = async (lmAddress: string, signer) => {
	const lmContract = new Contract(lmAddress, LM_ABI, signer)

	const harvest = await lmContract.getReward()

	// eslint-disable-next-line no-console
	console.log(harvest)
}

export const withdrawTokens = async (
	amount: number,
	lmAddress: string,
	signer,
) => {
	const lmContract = new Contract(lmAddress, LM_ABI, signer)

	const withdraw = await lmContract.withdraw(ethers.BigNumber.from(amount))

	// eslint-disable-next-line no-console
	console.log(withdraw)
}
