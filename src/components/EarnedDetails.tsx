import React, { PropsWithChildren } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import 'reactjs-popup/dist/index.css'
import { Earned } from '../types/poolInfo'
import { SimpleButton, SpaceBetween } from './Styles'

interface EarnedDetailsProps {
	earnedAmount: number
	claimablePercent: number
	claimablePercentRounded: number
	heldPercent: number
	heldPercentRounded: number
	displayToken: string
}

const EarnedDetails: React.FC<EarnedDetailsProps> = ({
	earnedAmount,
	claimablePercent,
	claimablePercentRounded,
	heldPercent,
	heldPercentRounded,
	displayToken,
}) => {
	if (claimablePercent <= 0) return null

	return (
		<StyledTooltip
			trigger={<PopupOpenButton> ? </PopupOpenButton>}
			position={['top center', 'bottom center']}
			contentStyle={{ borderRadius: '16px' }}
		>
			{close => (
				<div>
					<SpaceBetween>
						<h2>
							<b>Claimable Now:</b>{' '}
							<div className='pool-info-text'>
								{earnedAmount > 0 &&
									`${(
										earnedAmount *
										(claimablePercent / 100)
									).toFixed(4)} ${displayToken} `}
								({claimablePercentRounded}%)
							</div>
						</h2>
					</SpaceBetween>
					<SpaceBetween>
						<h2>
							<b>Transferable to Reservoir:</b>{' '}
							<div className='pool-info-text'>
								{earnedAmount > 0 &&
									`${(
										earnedAmount *
										(heldPercent / 100)
									).toFixed(4)} ${displayToken} `}
								({heldPercentRounded}%)
							</div>
						</h2>
					</SpaceBetween>
					<p>
						Learn more about the
						<a
							href='https://docs.dappnode.io/dao/node-basics#nodestream'
							target='_blank'
							rel='noreferrer'
						>
							<PopupTextButton>NODEstream</PopupTextButton>
						</a>
					</p>
				</div>
			)}
		</StyledTooltip>
	)
}

const StyledTooltip = styled(Popup)`
	&-content {
		border-radius: 15px;
		padding: 24px;
		width: 50%;

		.apr-table {
			display: flex;
			margin: 0 -24px;
			div {
				margin: 0 24px;
			}
		}
		h2 {
			font-family: Inter;
			font-style: normal;
			font-weight: 400;
			font-size: 16px;
			line-height: 20px;
			color: #353a41;
			margin-bottom: 0;
			b {
				font-weight: 600;
			}
		}
	}
`

const PopupTextButton = styled.button`
	margin-left: -4px;
	margin-right: -4px;
	font-family: 'Inter-Bold';
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 15px;
	text-align: center;
	color: #2fbcb2;
	background: transparent;
	border: solid 0px transparent;
	cursor: pointer;
`

const PopupOpenButton = styled(SimpleButton)`
	font-size: 16px;
`

export default React.memo(EarnedDetails)
