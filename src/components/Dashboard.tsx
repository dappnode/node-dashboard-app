import React from 'react'
import styled from 'styled-components'
import Rewards from './Rewards'
import { Inter700, SpaceBetween, WhiteGreenLink } from './Styles'

import StakingPoolCard from './StakingPoolCard'
import config from '../configuration'

const { MAINNET_CONFIG, XDAI_CONFIG } = config

function Dashboard() {
	return (
		<DashboardSection>
			<Inter700>
				<img alt='tokens' src='/assets/Tokens.svg' />
				<span style={{ marginLeft: '10px' }}>NODEstream</span>
			</Inter700>
			<RewardsContainer>
				<Rewards />
			</RewardsContainer>
			<br />
			<SpaceBetween>
				<Inter700>
					<img alt='pools' src='/assets/Pools.svg' />
					<span style={{ marginLeft: '10px' }}>NODEstaking</span>
				</Inter700>
				<div />
				<WhiteGreenLink
					target='_blank'
					href='https://medium.com/dappnode/a-node-for-the-future-an-ode-to-the-community-a-road-to-decentralized-sovereignty-1c8fa524e308'
				>
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
					network={config.MAINNET_NETWORK_NUMBER}
					provideLiquidityLink={`https://app.uniswap.org/#/add/v2/ETH/${MAINNET_CONFIG.TOKEN_ADDRESS}`}
					getMoreDNLink={`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${MAINNET_CONFIG.TOKEN_ADDRESS}&use=V2`}
				/>
				<StakingPoolCard
					name='NODE/ETH'
					platform='Sushiswap'
					option='SUSHISWAP'
					composition='50% NODE, 50% ETH'
					logo='/assets/dn-eth-logos.svg'
					network={config.MAINNET_NETWORK_NUMBER}
					provideLiquidityLink={`https://app.sushi.com/add/ETH/${MAINNET_CONFIG.TOKEN_ADDRESS}`}
					getMoreDNLink={`https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=${MAINNET_CONFIG.TOKEN_ADDRESS}`}
				/>
				<StakingPoolCard
					name='NODE'
					platform='NODE Staking'
					option='NODE'
					composition='100% NODE'
					logo='/assets/dn-logo.svg'
					network={config.MAINNET_NETWORK_NUMBER}
					provideLiquidityLink=''
					getMoreDNLink={`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${MAINNET_CONFIG.TOKEN_ADDRESS}&use=V2`}
				/>
				<StakingPoolCard
					name='NODE'
					platform='xNODE Staking'
					option='NODE'
					composition='100% NODE'
					logo='/assets/dn-logo.svg'
					network={config.XDAI_NETWORK_NUMBER}
					provideLiquidityLink=''
					getMoreDNLink={`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${MAINNET_CONFIG.TOKEN_ADDRESS}&use=V2`}
				/>
			</PoolsContainer>
		</DashboardSection>
	)
}

const DashboardSection = styled.section`
	height: 100%;
	width: 90%;
	max-width: 1140px;
	margin: auto;
	padding: 50px;

	@media (max-width: 1024px) {
		padding: 20px 0;
	}
`

const PoolsContainer = styled.div`
	display: grid;
	padding: 10px;
	grid-row-gap: 24px;
	grid-column-gap: 24px;
	grid-template-columns: repeat(1, 1fr);

	@media (min-width: 600px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1200px) {
		grid-template-columns: repeat(4, 1fr);
	}
`

const RewardsContainer = styled.div`
	display: flex;

	@media (max-width: 1024px) {
		flex-direction: column;
	}
`

export default Dashboard
