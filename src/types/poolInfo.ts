import BigNumber from 'bignumber.js'

interface Earned {
	amount: BigNumber | number
	token: string
}
export interface StakeUserInfo {
	stakedLpTokens?: BigNumber | number
	notStakedLpTokens?: BigNumber | number
	earned?: Earned
}
export interface StakePoolInfo extends StakeUserInfo {
	tokensInPool?: BigNumber | number
	tokensInPoolUSD?: BigNumber | number
	tokenPrice?: BigNumber
	APR?: BigNumber | null
}

export interface PoolInfo {
	name?: string
	provideLiquidity?: string
	composition?: string
	stakePoolInfo?: StakePoolInfo
}
