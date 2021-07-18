import React, { FC, useEffect, useState } from 'react'
import Router from 'next/router'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTokenBalance } from '../hooks/useTokenBalance'
import { useOnboard } from '../hooks/useOnboard'
import { config, XDAI_CONFIG } from '../configuration'
import { fetchStakePoolInfo } from '../lib/stakingPool'
import { convertEthHelper } from '../lib/numbers'
import { GRADIENT_TEXT } from './Styles'

const NodeDropHint: FC = () => {
	const { network } = useOnboard()
	const { tokenBalance } = useTokenBalance()

	const [APR, setAPR] = useState<BigNumber | null>(null)

	useEffect(() => {
		if (network === config.XDAI_NETWORK_NUMBER) {
			fetchStakePoolInfo(
				XDAI_CONFIG.NODE.POOL_ADDRESS,
				XDAI_CONFIG.NODE.LM_ADDRESS,
				network,
				false,
			)
				.then(stakePoolInfo => setAPR(stakePoolInfo.APR))
				.catch(console.error)
		} else {
			setAPR(null)
		}
	}, [network])

	if (tokenBalance.isZero() || !APR) return null

	return (
		<HintSection>
			<Inter>
				Hey, you can check your NODE tokens in your dashboard. There’s a{' '}
				<GRADIENT_TEXT>{convertEthHelper(APR, 2)}% APR</GRADIENT_TEXT>{' '}
				waiting for you there!
			</Inter>
			<DASHBOARD_BUTTON onClick={() => Router.push('/')}>
				Go to dashboard
			</DASHBOARD_BUTTON>
		</HintSection>
	)
}

const HintSection = styled.div`
	max-width: 800px;
	padding: 18px 32px;
	border-radius: 16px;
	background: #ffffff;
	box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
		0px 2px 16px rgba(8, 43, 41, 0.06);
	margin: 110px auto -100px;
	display: flex;
	align-content: center;
	flex-direction: row;
`

const Inter = styled.h2`
	font-family: Inter;
	left: 60.5px;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	align-items: center;
	color: #35403f;
	order: 0;
	margin: auto 24px;
`

const DASHBOARD_BUTTON = styled.button`
	background: linear-gradient(99.61deg, #86e4dd -0.13%, #2fbcb2 99.3%);
	border: solid 0px transparent;
	width: 129px;
	box-sizing: content-box;
	border-radius: 27px;
	font-family: 'Inter';
	font-weight: normal;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	color: white;
	cursor: pointer;
	padding: 8px 16px;
	margin: 12px 12px;
	box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
		0px 0px 8px rgba(8, 43, 41, 0.06);

	&:hover {
		background: linear-gradient(99.61deg, #76ccc5 -0.13%, #218c84 99.3%);
		transition: all 0.25s ease-in-out;
	}

	&.long {
		width: -webkit-fill-available;
	}
`

export default NodeDropHint
