import React, { useEffect, useState } from 'react'
import PoolCard from './PoolCard'
import { config, STAKING_ADDRESSES } from '../configuration'
import {
	fetchStakePoolInfo,
	fetchUserInfo,
	stakeTokens,
	harvestTokens,
	withdrawTokens,
} from '../lib/stakingPool'
import { useOnboard } from '../hooks/useOnboard'

const StakingPoolCard = ({
	composition,
	name,
	logo,
	option,
	platform,
	network,
}) => {
	const [stakePoolInfo, setStakePoolInfo] = useState({
		tokensInPool: '-',
		tokensInPoolUSD: '-',
		APR: '-',
		earned: { amount: 0, token: 'NODE' },
	})
	const [stakeUserInfo, setStakeUserInfo] = useState({
		lpTokens: '0',
		earned: { amount: '0', token: 'NODE' },
	})
	const { address, provider } = useOnboard()

	useEffect(() => {
		if (name === 'NODE') return
		fetchStakePoolInfo(
			STAKING_ADDRESSES[network][option].POOL_ADDRESS,
			STAKING_ADDRESSES[network][option].LM_ADDRESS,
			network,
			true
		).then(setStakePoolInfo)
	}, [])

	useEffect(() => {
		fetchUserInfo(
			address,
			STAKING_ADDRESSES[network][option].POOL_ADDRESS,
			STAKING_ADDRESSES[network][option].LM_ADDRESS,
			network
		).then(({ earned, lpTokens }) => {
			setStakeUserInfo({
				lpTokens,
				earned: { amount: earned, token: 'NODE' },
			})
		})
	}, [address])

	async function handleStake() {
		await stakeTokens(
			40,
			STAKING_ADDRESSES[network][option].POOL_ADDRESS,
			STAKING_ADDRESSES[network][option].LM_ADDRESS,
			address,
			provider
		)
	}

	async function handleHarvest() {
		const signer = provider.getSigner()
		await harvestTokens(
			STAKING_ADDRESSES[network][option].LM_ADDRESS,
			signer
		)
	}

	async function handleWithdraw() {
		const signer = provider.getSigner()
		await withdrawTokens(
			1000000,
			STAKING_ADDRESSES[network][option].LM_ADDRESS,
			signer
		)
	}

	return (
		<PoolCard
			logo={logo}
			name={name}
			platform={platform}
			composition={composition}
			stakePoolInfo={{
				provideLiquidityLink: `https://app.uniswap.org/#/add/v2/ETH/${config.TOKEN_ADDRESS}`,
				...stakePoolInfo,
				...stakeUserInfo,
			}}
			handleStake={handleStake}
			handleHarvest={handleHarvest}
			handleWithdraw={handleWithdraw}
			hasLiquidityPool={name !== 'NODE'}
		/>
	)
}

export default StakingPoolCard
