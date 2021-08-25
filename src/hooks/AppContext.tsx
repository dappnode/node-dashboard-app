import React from 'react'
import { BigNumber } from 'ethers'
import { StakeUserInfo } from '../types/poolInfo'

export interface AppContextInterface {
	uniswap: StakeUserInfo | null
	sushiswap: StakeUserInfo | null
	streamMainnet: StakeUserInfo | null
	streamDN: StakeUserInfo | null
	ethLocked: BigNumber | null
	xDaiLocked: BigNumber | null
	ethClaimable: BigNumber | null
	xDaiClaimable: BigNumber | null
	uniswapLPNODE: BigNumber | null
	sushiswapLPNODE: BigNumber | null
}

const AppContext = React.createContext<AppContextInterface | null>(null)

export default AppContext
