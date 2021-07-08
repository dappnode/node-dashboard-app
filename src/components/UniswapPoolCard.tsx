import React, { useEffect, useState } from 'react'
import PoolCard from './PoolCard'
import config from '../configuration'
import {
	fetchStakePoolInfo as uniswapFetchStakePoolInfo,
	uniswapFetchUserInfo,
} from '../lib/uniswap'
import { useOnboard } from '../hooks/useOnboard'

const UniswapPoolCard = () => {
	const [stakePoolInfo, setStakePoolInfo] = useState({
		tokensInPool: '-',
		tokensInPoolUSD: '-',
		APR: '-',
		earned: { amount: 0, token: 'DN' },
	})
	const [stakeUserInfo, setStakeUserInfo] = useState({
		lpTokens: '0',
		earned: { amount: '0', token: 'DN' },
	})
	const { address } = useOnboard()
	useEffect(() => {
		uniswapFetchStakePoolInfo(
			config.UNISWAP_POOL_ADDRESS,
			config.UNISWAP_LM_ADDRESS
		).then(setStakePoolInfo)
	}, [])

	useEffect(() => {
		uniswapFetchUserInfo(
			address,
			config.UNISWAP_POOL_ADDRESS,
			config.UNISWAP_LM_ADDRESS
		).then(({ earned, lpTokens }) => {
			setStakeUserInfo({
				lpTokens,
				earned: { amount: earned, token: 'DN' },
			})
		})
	}, [address])
	return (
		<PoolCard
			logo='/assets/dn-eth-logos.svg'
			name='NODE/xDAI'
			platform='Uniswap'
			composition='50% NODE, 50% ETH'
			stakePoolInfo={{
				provideLiquidityLink: `https://app.uniswap.org/#/add/v2/ETH/${config.TOKEN_ADDRESS}`,
				...stakePoolInfo,
				...stakeUserInfo,
			}}
			hasLiquidityPool
		/>
	)
}

export default UniswapPoolCard
