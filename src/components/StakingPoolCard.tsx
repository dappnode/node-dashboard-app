import React, { useEffect, useRef, useState, useContext } from 'react'
import BigNumber from 'bignumber.js'
import PoolCard from './PoolCard'
import config from '../configuration'
import {
	fetchStakePoolInfo,
	fetchUserInfo,
	stakeTokens,
	approve,
	stakeTokensWithoutPermit,
	harvestTokens,
	withdrawTokens,
} from '../lib/stakingPool'
import { useOnboard } from '../hooks/useOnboard'
import { StakePoolInfo, StakeUserInfo } from '../types/poolInfo'
import { isMainnet } from '../lib/web3-utils'
import AppContext from '../hooks/AppContext'

const { NETWORKS_CONFIG } = config

interface StakingPoolCardProps {
	composition: string
	name: string
	logo: string
	option: string
	platform: string
	network: number
	provideLiquidityLink: string
	getMoreDNLink: string
}

const StakingPoolCard: React.FC<StakingPoolCardProps> = ({
	composition,
	name,
	logo,
	option,
	platform,
	network,
	provideLiquidityLink = '',
	getMoreDNLink = '',
}) => {
	const [stakePoolInfo, setStakePoolInfo] = useState<StakePoolInfo>({
		tokensInPool: 0,
		tokensInPoolUSD: 0,
		APR: null,
		earned: {
			amount: new BigNumber(0),
			token: 'NODE',
			displayToken: isMainnet(network) ? 'NODE' : 'xNODE',
		},
		allowanceLpTokens: 0,
	})
	const [stakeUserInfo, setStakeUserInfo] = useState<StakeUserInfo>({
		stakedLpTokens: 0,
		notStakedLpTokensWei: 0,
		earned: {
			amount: new BigNumber(0),
			token: 'NODE',
			displayToken: isMainnet(network) ? 'NODE' : 'xNODE',
		},
		allowanceLpTokens: 0,
	})
	const appContext = useContext(AppContext)
	const { address, provider, network: walletNetwork, isReady } = useOnboard()

	const stakePoolPoll = useRef(null)
	useEffect(() => {
		// if (name === 'NODE') return
		const cb = () =>
			fetchStakePoolInfo(
				NETWORKS_CONFIG[network][option].POOL_ADDRESS,
				NETWORKS_CONFIG[network][option].LM_ADDRESS,
				network,
				name !== 'NODE',
			)
				.then(poolInfo => {
					setStakePoolInfo(poolInfo)
				})
				.catch(console.error)
		cb()

		stakePoolPoll.current = setInterval(cb, 15000)
		return () => {
			if (stakePoolPoll.current) {
				clearInterval(stakePoolPoll.current)
				stakePoolPoll.current = null
			}
		}
	}, [])

	function updateStakeUserInfo(userInfo: StakeUserInfo) {
		setStakeUserInfo(userInfo)
		switch (option) {
			case 'UNISWAP':
				appContext.uniswap = userInfo
				break
			case 'SUSHISWAP':
				appContext.sushiswap = userInfo
				break
			case 'NODE':
				switch (platform) {
					case 'NODE Staking':
						appContext.streamMainnet = userInfo
						break
					case 'xNODE Staking':
						appContext.streamDN = userInfo
						break
					default:
				}
				break
			default:
		}
	}

	const userInfoPoll = useRef(null)
	useEffect(() => {
		if (!address) return
		const cb = () =>
			fetchUserInfo(
				address,
				NETWORKS_CONFIG[network][option].POOL_ADDRESS,
				NETWORKS_CONFIG[network][option].LM_ADDRESS,
				network,
			)
				.then(userInfo => {
					updateStakeUserInfo(userInfo)
				})
				.catch(console.error)

		cb()

		userInfoPoll.current = setInterval(cb, 15000)
		return () => {
			if (userInfoPoll.current) {
				clearInterval(userInfoPoll.current)
				userInfoPoll.current = null
			}
		}
	}, [address])

	async function handleStake(amount: string) {
		await stakeTokens(
			amount,
			NETWORKS_CONFIG[network][option].POOL_ADDRESS,
			NETWORKS_CONFIG[network][option].LM_ADDRESS,
			provider,
		)
	}

	async function handleApprove(amount: string) {
		await approve(
			amount,
			NETWORKS_CONFIG[network][option].POOL_ADDRESS,
			NETWORKS_CONFIG[network][option].LM_ADDRESS,
			provider,
		)
	}

	async function handleStakeWithoutPermit(amount: string) {
		await stakeTokensWithoutPermit(
			amount,
			NETWORKS_CONFIG[network][option].POOL_ADDRESS,
			NETWORKS_CONFIG[network][option].LM_ADDRESS,
			provider,
		)
	}

	async function handleHarvest() {
		const signer = provider.getSigner()
		await harvestTokens(
			NETWORKS_CONFIG[network][option].LM_ADDRESS,
			network,
			signer,
		)
	}

	async function handleWithdraw(amount) {
		const signer = provider.getSigner()
		await withdrawTokens(
			amount,
			NETWORKS_CONFIG[network][option].LM_ADDRESS,
			network,
			signer,
		)
	}

	return (
		<PoolCard
			logo={logo}
			disabled={network !== walletNetwork || !isReady}
			name={name}
			platform={platform}
			network={network}
			composition={composition}
			stakePoolInfo={{
				provideLiquidityLink,
				getMoreDNLink,
				...stakePoolInfo,
				...stakeUserInfo,
			}}
			handleStake={handleStake}
			handleApprove={handleApprove}
			handleStakeWithoutPermit={handleStakeWithoutPermit}
			handleHarvest={handleHarvest}
			handleWithdraw={handleWithdraw}
			hasLiquidityPool={name !== 'NODE'}
		/>
	)
}

export default StakingPoolCard
