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

	const [lpTokens, earned] = await Promise.all([
		lmContract.balanceOf(validAddress),
		lmContract.earned(validAddress),
	])

	// eslint-disable-next-line no-console
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

	const poolContract = new Contract(poolAddress, UNI_ABI, signer)
	const lmContract = new Contract(lmAddress, LM_ABI, signer)

	const approve = await poolContract.approve(
		lmAddress,
		ethers.BigNumber.from(amount)
	)

	if (!approve) return // it needs a better logic. we should wait the txn to execute the next line.

	const stake = await lmContract.stake(ethers.BigNumber.from(amount))

	// eslint-disable-next-line no-console
	console.log(stake)

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
