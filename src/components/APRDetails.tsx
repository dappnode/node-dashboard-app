import React, { PropsWithChildren } from 'react'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import 'reactjs-popup/dist/index.css'
import BigNumber from 'bignumber.js'
import {
	WhiteGreenButtonLink,
	Inter400,
	Inter500,
	SimpleButton,
	SpaceBetween,
} from './Styles'
import { convertEthHelper } from '../lib/numbers'

interface APRDetailsProps {
	APR: BigNumber | null
	tokenPrice: BigNumber | undefined
}

interface RoiValue {
	roi: BigNumber
	dn: BigNumber | undefined
}
interface RoiValues {
	[key: string]: RoiValue
}

const steps = ['1', '7', '30', '365']

const computeValues = (APR: BigNumber, tokenPrice: BigNumber): RoiValues => {
	// APR is in percent for 365 days
	const dayInterest = APR.div(365 * 100)

	const result: RoiValues = {}

	steps.forEach(step => {
		const roi = dayInterest.plus(1).pow(step).minus(1)
		const dn = tokenPrice && roi.times(1000).div(tokenPrice)
		result[step] = { roi: roi.times(100), dn }
	})

	return result
}

const APRDetails: React.FC<APRDetailsProps> = ({ APR, tokenPrice }) => {
	if (!APR) return null
	const values = computeValues(APR, tokenPrice)

	return (
		<StyledPopup trigger={<SimpleButton>See details</SimpleButton>} modal>
			{close => (
				<div className='modal'>
					<Spaced>
						<h2>APR Details</h2>
						<img
							alt='close'
							src='/assets/closeModal.svg'
							onClick={close}
						/>
					</Spaced>
					<div className='apr-table'>
						<div>
							<Inter500>Timeframe</Inter500>
							<Text>1 Day</Text>
							<Text>7 Days</Text>
							<Text>30 Days</Text>
							<Text>365 Days (APY)</Text>
						</div>
						<div>
							<Inter500>ROI</Inter500>
							{steps.map(step => (
								<Text>
									{convertEthHelper(values[step].roi, 2)}%
								</Text>
							))}
						</div>
						<div>
							<Inter500>DN per $1000</Inter500>
							{steps.map(step => (
								<Text>
									{convertEthHelper(values[step].dn, 2)}
								</Text>
							))}
						</div>
					</div>
					<div className='actions'>
						<WhiteGreenButtonLink>
							Get more DN{' '}
							<img
								alt='link'
								src='/assets/external-link-green.svg'
							/>
						</WhiteGreenButtonLink>
					</div>
				</div>
			)}
		</StyledPopup>
	)
}

const StyledPopup = styled(Popup)`
	&-content {
		border-radius: 24px;
		padding: 32px;
		width: auto;

		.apr-table {
			display: flex;
			margin: 0 -32px;
			div {
				margin: 0 32px;
			}
		}
	}
`

const Text = styled(Inter400)`
	color: #222a29;
	margin-bottom: 16px;
`

const Spaced = styled(SpaceBetween)`
	position: absolute;
	width: calc(100% - 15px);
	top: -57px;
	left: 15px;
	img {
		cursor: pointer;
	}
	h2 {
		font-family: 'Inter-Bold';
		font-weight: bold;
		font-size: 16px;
		line-height: 24px;
		color: #ffffff;
	}
`

const isEqual = (
	prevProps: APRDetailsProps,
	nextProps: APRDetailsProps,
): boolean =>
	Boolean(
		prevProps.APR &&
			nextProps.APR &&
			prevProps.APR.isEqualTo(nextProps.APR) &&
			prevProps.tokenPrice &&
			nextProps.tokenPrice &&
			prevProps.tokenPrice.isEqualTo(nextProps.tokenPrice),
	)

export default React.memo(APRDetails, isEqual)
