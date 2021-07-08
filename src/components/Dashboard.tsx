import React from 'react'
import styled from 'styled-components'
import Rewards from './Rewards'
import { Inter700, SpaceBetween, WhiteGreenLink } from './Styles'

import PoolCard from './PoolCard'
import UniswapPoolCard from './UniswapPoolCard'

function Dashboard() {
	return (
		<DashboardSection>
			<Inter700>
				<img alt='tokens' src='/assets/Tokens.svg' />
				<span style={{ marginLeft: '10px' }}>My tokens</span>
			</Inter700>
			<PoolsContainer>
				<Rewards />
			</PoolsContainer>
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
				<UniswapPoolCard />
				<PoolCard
					name='NODE/HNY'
					logo='/assets/dn-eth-logos.svg'
					platform='Sushiswap'
					composition='50% NODE, 50% ETH'
					stakePoolInfo={{
						tokensInPool: '1532 DN, 0.23 ETH',
						tokensInPoolUSD: '(1400.65 USD)',
						lpTokens: 56,
						APR: '148.55%',
						earned: { amount: 900, token: 'DN' },
					}}
					// poolAddress='0xb755a9614bfd5eb812b9cc3d00166565f2e72b41'
					// owner={address}
					hasLiquidityPool
				/>
				<PoolCard
					name='NODE'
					logo='/assets/dn-logo.svg'
					platform='NODE Staking'
					composition='100% NODE'
					stakePoolInfo={{
						tokensInPool: '1532 DN, 0.23 ETH',
						tokensInPoolUSD: '(1400.65 USD)',
						lpTokens: 56,
						APR: '148.55%',
						earned: { amount: 900, token: 'DN' },
					}}
					// poolAddress='0xf43913aF72af30d6b34782D08C4De3F6a14Ce42e'
					// owner={address}
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

export default Dashboard
