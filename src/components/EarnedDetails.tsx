import React, { PropsWithChildren } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import 'reactjs-popup/dist/index.css'
import { Earned } from '../types/poolInfo'
import { SimpleButton, SpaceBetween } from './Styles'

interface EarnedDetailsProps {
	isMainnet: boolean
	earned?: Earned
}

const EarnedDetails: React.FC<EarnedDetailsProps> = ({
	isMainnet = true,
	earned,
}) => {
	let claimablePercent = 0
	let heldPercent = 0
	if (!earned) return null

	// starting time: 1626552000 -> Sat Jul 17 2021 22:00:00 GMT+0200 (Central European Summer Time)
	// duration 94672800 secs
	const durationSecs = 94672800
	const defaultHeldMainnetPercent = 10
	const earnedAmount = earned.amount.toNumber()
	const claimableSecs =
		(new Date().getTime() -
			new Date('Sat Jul 17 2021 22:00:00 GMT+0200').getTime()) /
		1000
	claimablePercent = (claimableSecs * 100) / durationSecs
	heldPercent = 100 - claimablePercent
	if (isMainnet) {
		claimablePercent += defaultHeldMainnetPercent
		heldPercent -= defaultHeldMainnetPercent
	}
	const claimablePercentRounded = Math.round(claimablePercent * 100) / 100
	const heldPercentRounded = Math.round(heldPercent * 100) / 100
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
									).toFixed(4)} ${earned.displayToken} `}
								({claimablePercentRounded}%)
							</div>
						</h2>
					</SpaceBetween>
					<SpaceBetween>
						<h2>
							<b>Held in Reservoir:</b>{' '}
							<div className='pool-info-text'>
								{earnedAmount > 0 &&
									`${(
										earnedAmount *
										(heldPercent / 100)
									).toFixed(4)} ${earned.displayToken} `}
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
