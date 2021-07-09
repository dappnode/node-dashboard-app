import React, { useEffect, useRef, useState } from 'react'
import PoolCard from './PoolCard'
import { STAKING_ADDRESSES } from '../configuration'
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
	provideLiquidityLink = '',
}) => {
	const [stakePoolInfo, setStakePoolInfo] = useState({
		tokensInPool: '-',
		tokensInPoolUSD: '-',
		APR: '-',
		earned: { amount: 0, token: 'NODE' },
	})
	const [stakeUserInfo, setStakeUserInfo] = useState({
		stakedLpTokens: '0',
		notStakedLpTokens: '0',
		allowance: '0',
		earned: { amount: '0', token: 'NODE' },
	})
	const { address, provider } = useOnboard()

	const stakePoolPoll = useRef(null)
	useEffect(() => {
		if (name === 'NODE') return
		const cb = () =>
			fetchStakePoolInfo(
				STAKING_ADDRESSES[network][option].POOL_ADDRESS,
				STAKING_ADDRESSES[network][option].LM_ADDRESS,
				network,
				true,
			).then(setStakePoolInfo)
		cb().then()

		stakePoolPoll.current = setInterval(cb, 15000)
		return () => {
			if (stakePoolPoll.current) {
				stakePoolPoll.current.unsubscribe()
				stakePoolPoll.current = null
			}
		}
	}, [])

	const userInfoPoll = useRef(null)
	useEffect(() => {
		if (!address) return
		const cb = () =>
			fetchUserInfo(
				address,
				STAKING_ADDRESSES[network][option].POOL_ADDRESS,
				STAKING_ADDRESSES[network][option].LM_ADDRESS,
				network,
			).then(
				({ earned, stakedLpTokens, notStakedLpTokens, allowance }) => {
					setStakeUserInfo({
						stakedLpTokens,
						notStakedLpTokens,
						allowance,
						earned: { amount: earned, token: 'NODE' },
					})
				},
			)

		cb().then()

		userInfoPoll.current = setInterval(cb, 15000)
		return () => {
			if (userInfoPoll.current) {
				userInfoPoll.current.unsubscribe()
				userInfoPoll.current = null
			}
		}
	}, [address])

	async function handleStake(amount) {
		await stakeTokens(
			amount,
			STAKING_ADDRESSES[network][option].POOL_ADDRESS,
			STAKING_ADDRESSES[network][option].LM_ADDRESS,
			address,
			provider,
		)
	}

	async function handleHarvest() {
		const signer = provider.getSigner()
		await harvestTokens(
			STAKING_ADDRESSES[network][option].LM_ADDRESS,
			signer,
		)
	}

	async function handleWithdraw() {
		const signer = provider.getSigner()
		await withdrawTokens(
			1000000,
			STAKING_ADDRESSES[network][option].LM_ADDRESS,
			signer,
		)
	}

	return (
		<PoolCard
			logo={logo}
			name={name}
			platform={platform}
			composition={composition}
			stakePoolInfo={{
				provideLiquidityLink,
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
