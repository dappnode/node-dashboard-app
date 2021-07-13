import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

export const bn = x => ethers.BigNumber.from(x)

export const ZERO = bn('0')

export const ONE = bn('1000000000000000000')

export const convertEthHelper = (amount: any, decimals: number) => {
	if (!amount) return '0'
	let amt: BigNumber = amount
	if (!(amount instanceof BigNumber)) {
		amt = new BigNumber(amount)
	}
	if (amt.isZero()) return '0'
	if (amt.gt(10 ** 10)) {
		return amt.toExponential(10)
	}
	return amt.decimalPlaces(Number(decimals), BigNumber.ROUND_DOWN).toFormat({
		groupSize: 3,
		groupSeparator: ',',
		decimalSeparator: '.',
	})
}
