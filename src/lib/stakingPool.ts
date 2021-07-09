import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { JsonRpcProvider } from '@ethersproject/providers'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { abi as LM_ABI } from '../artifacts/UnipoolVested.json'
import { config, INFURA_ENDPOINTS } from '../configuration'

const toBigNumber = (eb: ethers.BigNumber): BigNumber =>
	new BigNumber(eb.toString())

export const fetchStakePoolInfo = async (
	poolAddress: string,
	lmAddress: string,
	network: number,
	hasLiquidityPool: boolean
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
			: _reserve1
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
		lpTokens: 0,
		APR,
		earned: { amount: 0, token: 'DN' },
	}
}

export const fetchUserInfo = async (
	address: string,
	poolAddress: string,
	lmAddress: string,
	network: number
) => {
	const provider = new JsonRpcProvider(INFURA_ENDPOINTS[network])

	let validAddress = ''
	try {
		validAddress = ethers.utils.getAddress(address)
	} catch (_) {
		return {
			earned: '0',
			lpTokens: '0',
		}
	}

	const lmContract = new Contract(lmAddress, LM_ABI, provider)
	const poolContract = new Contract(poolAddress, UNI_ABI, provider)


	const [lpTokens, earned] = await Promise.all([
		poolContract.balanceOf(validAddress),
		lmContract.earned(validAddress),
	])

	// eslint-disable-next-line no-console
	console.log(ethers.utils.formatEther(lpTokens))

	console.log(ethers.utils.formatEther(earned))

	return {
		lpTokens: ethers.utils.formatEther(lpTokens),
		earned: ethers.utils.formatEther(earned),
	}
}

export const stakeTokens = async (
	amount: number,
	poolAddress: string,
	lmAddress: string,
	address: string,
	provider
) => {
	const signer = provider.getSigner()
	const signerAddress = await signer.getAddress();

	const poolContract = new Contract(poolAddress, UNI_ABI, signer)
	const lmContract = new Contract(lmAddress, LM_ABI, signer)

	const domain = {
		name: await poolContract.name(),
		version: '1',
		chainId: provider.network.chainId,
		verifyingContract: poolAddress,
	};

	// The named list of all type definitions
	const types = {
		Permit: [
			{ name: 'owner', type: 'address' },
			{ name: 'spender', type: 'address' },
			{ name: 'value', type: 'uint256' },
			{ name: 'nonce', type: 'uint256' },
			{ name: 'deadline', type: 'uint256' }
		]
	};

	// The data to sign
	const value = {
		owner: signerAddress,
		spender: lmAddress,
		value: ethers.utils.parseEther(amount.toString()),
		nonce: await poolContract.nonces(signerAddress),
		deadline: ethers.constants.MaxUint256,
	};

	const rawSignature = await signer._signTypedData(domain, types, value)
	const signature = ethers.utils.splitSignature(rawSignature)

	const rawPermitCall = await poolContract.populateTransaction.permit(
		signerAddress,
		lmAddress,
		ethers.utils.parseEther(amount.toString()),
		ethers.constants.MaxUint256,
		signature.v,
		signature.r,
		signature.s
	);

	const txResponse = await lmContract
		.connect(signer)
		.stakeWithPermit(
			ethers.utils.parseEther(amount.toString()),
			rawPermitCall.data
		)

	console.log(txResponse);

	// eslint-disable-next-line no-console

	// DRAFT FOR CLAIMING ON XDAI

	// const poolContract = new Contract(poolAddress, NODE_ABI, signer)

	// const result = await signDaiPermit(
	// 	provider,
	// 	poolAddress,
	// 	address,
	// 	lmAddress
	// )

	// console.log(result)

	// const stake = await poolContract.permit(
	// 	address,
	// 	lmAddress,
	// 	ethers.BigNumber.from(amount),
	// 	result.expiry,
	// 	result.v,
	// 	result.r,
	// 	result.s,
	// 	{
	// 		gasLimit: 100000,
	// 		gasPrice: ethers.BigNumber.from(50),
	// 	}
	// )

	// console.log(stake)
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
	signer
) => {
	const lmContract = new Contract(lmAddress, LM_ABI, signer)

	const withdraw = await lmContract.withdraw(ethers.BigNumber.from(amount))

	// eslint-disable-next-line no-console
	console.log(withdraw)
}
