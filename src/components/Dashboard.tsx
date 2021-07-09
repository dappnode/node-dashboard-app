import React from 'react'
import styled from 'styled-components'
import Rewards from './Rewards'
import { Inter700, SpaceBetween, WhiteGreenLink } from './Styles'

import StakingPoolCard from './StakingPoolCard'
import { config } from '../configuration'

function Dashboard() {
	return (
		<DashboardSection>
			<Inter700>
				<img alt='tokens' src='/assets/Tokens.svg' />
				<span style={{ marginLeft: '10px' }}>My tokens</span>
			</Inter700>
			<RewardsContainer>
				<Rewards />
			</RewardsContainer>
			<br />
			<SpaceBetween>
				<Inter700>
					<img alt='pools' src='/assets/Pools.svg' />
					<span style={{ marginLeft: '10px' }}>Staking Pools</span>
				</Inter700>
				<div />
				<WhiteGreenLink>
					How does this work?{' '}
					<img alt='link' src='/assets/external-link-green.svg' />
				</WhiteGreenLink>
			</SpaceBetween>
			<PoolsContainer>
				<StakingPoolCard
					name='NODE/ETH'
					platform='Uniswap'
					option='UNISWAP'
					composition='50% NODE, 50% ETH'
					logo='/assets/dn-eth-logos.svg'
					network={4}
					provideLiquidityLink={`https://app.uniswap.org/#/add/v2/ETH/${config.TOKEN_ADDRESS}`}
				/>
				<StakingPoolCard
					name='NODE/ETH'
					platform='Sushiswap'
					option='SUSHISWAP'
					composition='50% NODE, 50% ETH'
					logo='/assets/dn-eth-logos.svg'
					network={4}
				/>
				<StakingPoolCard
					name='NODE'
					platform='NODE Staking'
					option='NODE'
					composition='100% NODE'
					logo='/assets/dn-logo.svg'
					network={4}
				/>
				<StakingPoolCard
					name='NODE'
					platform='NODE Staking'
					option='NODE'
					composition='100% NODE'
					logo='/assets/dn-logo.svg'
					network={5}
				/>
			</PoolsContainer>
		</DashboardSection>
	)
}

const DashboardSection = styled.section`
	height: 100%;
	width: 80%;
	max-width: 1140px;
	margin: auto;
	padding: 50px 100px;
`

const PoolsContainer = styled.div`
	display: flex;
`

const RewardsContainer = styled(PoolsContainer)`
	@media (max-width: 1024px) {
		flex-direction: column;
	}
`

export default Dashboard
