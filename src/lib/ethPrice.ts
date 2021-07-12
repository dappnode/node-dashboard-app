import { Contract, ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { config } from '../configuration'
import { abi as ETH_PRICE_ORACLE_ABI } from '../artifacts/EACAggregatorProxy.json'
import { mainnetProvider } from './networkProvider'

const FIVE_MINUTES: number = 5 * 60 * 1000

let priceListeners: Array<(price: BigNumber) => void> | null = null

let latestPrice: BigNumber
let latestUpdate = 0

const fetchPrice = async (): Promise<BigNumber> => {
	const now: number = new Date().getTime()

	if (now - latestUpdate < FIVE_MINUTES) {
		return latestPrice
	}

	priceListeners = []

	const oracleContract = new Contract(
		config.ETH_USDT_ORACLE,
		ETH_PRICE_ORACLE_ABI,
		mainnetProvider,
	)
	const answer: ethers.BigNumber = await oracleContract.latestAnswer()
	latestPrice = new BigNumber(answer.toString()).div(10 ** 8)
	latestUpdate = now

	priceListeners.forEach(cb => cb(latestPrice))

	priceListeners = null

	return latestPrice
}

export const getEthPrice = (): Promise<BigNumber> => {
	if (priceListeners) {
		return new Promise(resolve => {
			priceListeners.push(resolve)
		})
	}

	return fetchPrice()
}
