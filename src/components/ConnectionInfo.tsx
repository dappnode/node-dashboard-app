import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { ethers } from 'ethers'
import { getNetworkType, shortenAddress } from '../lib/web3-utils'
import {
	GreenButton,
	LightBlueButton,
	LightGreenButton,
	NavbarButton,
} from './Styles'

import { useOnboard } from '../hooks/useOnboard'
import { config } from '../configuration'
import { convertEthHelper } from '../lib/numbers'
import { useTokenBalance } from '../hooks/useTokenBalance'

const Connection = ({ nodedrop }) => {
	const { address, network } = useOnboard()
	const { tokenBalance } = useTokenBalance()

	return (
		<>
			{nodedrop ? (
				<Link href='/'>
					<GreenButton>Go to dashboard!</GreenButton>
				</Link>
			) : (
				<Link href='/nodedrop'>
					<GreenButton>Claim your airdrop!</GreenButton>
				</Link>
			)}
			{network === config.MAINNET_NETWORK_NUMBER && (
				<LightBlueButton>
					Network: {getNetworkType(network)}{' '}
				</LightBlueButton>
			)}
			{network === config.XDAI_NETWORK_NUMBER && (
				<LightGreenButton>
					Network: {getNetworkType(network)}{' '}
				</LightGreenButton>
			)}
			{address && (
				<>
					<NavbarButton>
						<p>
							{convertEthHelper(
								ethers.utils.formatEther(tokenBalance),
								4,
							)}{' '}
							Node
						</p>
					</NavbarButton>
					<NavbarButton>
						<p>{shortenAddress(address)}</p>
					</NavbarButton>
				</>
			)}
		</>
	)
}

// eslint-disable-next-line no-unused-vars
const ConnectWallet = styled.button`
	background: #ffffff;
	border: solid 0px transparent;
	border-radius: 27px;
	font-family: 'Inter-Bold';
	font-weight: bold;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	color: #23c8bc;
	padding: 8px 16px;
	box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
		0px 0px 8px rgba(8, 43, 41, 0.06);
	&:hover {
		cursor: pointer;
		background: #c4f3ef;
		color: #144b52;
		transition: all 0.25s ease-in-out;
	}
`

export default Connection
