import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import {
	JsonRpcProvider,
	TransactionResponse,
	Web3Provider,
} from '@ethersproject/providers'
import BRIDGE_ABI from '../artifacts/BridgeToken.json'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { abi as LM_ABI } from '../artifacts/UnipoolVested.json'
import { config, INFURA_ENDPOINTS } from '../configuration'

const toBigNumber = (eb: ethers.BigNumber): BigNumber =>
	new BigNumber(eb.toString())

export const fetchStakePoolInfo = async (
	poolAddress: string,
	lmAddress: string,
	network: number,
	hasLiquidityPool: boolean,
) => {
	if (!hasLiquidityPool) return

	const provider = new JsonRpcProvider(INFURA_ENDPOINTS[network])

	const poolContract = new Contract(poolAddress, UNI_ABI, provider)
	const lmContract = new Contract(lmAddress, LM_ABI, provider)

	const [reserves, _token0, _totalSupply, _rewardRate] = await Promise.all([
		poolContract.getReserves(),
		poolContract.token0(),
		lmContract.totalSupply(),
		lmContract.rewardRate(),
	])

	const [_reserve0, _reserve1] = reserves
	const reserve = toBigNumber(
		_token0.toLowerCase() === config.TOKEN_ADDRESS.toLowerCase()
			? _reserve0
			: _reserve1,
	)

	const lp = toBigNumber(_totalSupply)
		.times(reserve)
		.times(2)
		.div(10 ** 18)

	const APR = _totalSupply.isZero()
		? '-'
		: toBigNumber(_rewardRate)
				.times('31536000')
				.times('100')
				.div(lp)
				.decimalPlaces(2)
				.toFixed()

	return {
		tokensInPool: _totalSupply as string,
		tokensInPoolUSD: '-',
		stakedLpTokens: 0,
		APR,
		earned: { amount: 0, token: 'DN' },
	}
}

export const fetchUserInfo = async (
	address: string,
	poolAddress: string,
	lmAddress: string,
	network: number,
) => {
	const provider = new JsonRpcProvider(INFURA_ENDPOINTS[network])

	let validAddress = ''
	try {
		validAddress = ethers.utils.getAddress(address)
	} catch (_) {
		return {
			earned: '0',
			stakedLpTokens: '0',
		}
	}

	const lmContract = new Contract(lmAddress, LM_ABI, provider)
	const poolContract = new Contract(poolAddress, UNI_ABI, provider)

	const [stakedLpTokens, earned, notStakedLpTokens, allowance] =
		await Promise.all([
			lmContract.balanceOf(validAddress),
			lmContract.earned(validAddress),
			poolContract.balanceOf(validAddress),
			poolContract.allowance(validAddress, lmAddress),
		])

	return {
		stakedLpTokens: ethers.utils.formatEther(stakedLpTokens),
		earned: ethers.utils.formatEther(earned),
		notStakedLpTokens: notStakedLpTokens.toString(),
		allowance: allowance.toString(),
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
