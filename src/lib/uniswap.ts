import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { JsonRpcProvider } from '@ethersproject/providers'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { abi as LM_ABI } from '../artifacts/UnipoolVested.json'
import config from '../configuration'

const provider = new JsonRpcProvider(config.nodeUrl)

const toBigNumber = (eb: ethers.BigNumber): BigNumber =>
	new BigNumber(eb.toString())

export const fetchStakePoolInfo = async (
	poolAddress: string,
	lmAddress: string
) => {
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

export const uniswapFetchUserInfo = async (
	address: string,
	poolAddress: string,
	lmAddress: string
) => {
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

	return {
		lpTokens: ethers.utils.formatEther(lpTokens),
		earned: ethers.utils.formatEther(earned),
	}
}
