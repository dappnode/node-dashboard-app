import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { Contract, ethers } from 'ethers'
import { shortenAddress, getNetworkType } from '../lib/web3-utils'
import {
	LightGreenButton,
	LightBlueButton,
	NavbarButton,
	GreenButton,
} from './Styles'

import { useOnboard } from '../hooks/useOnboard'
import { NETWORKS_CONFIG } from '../configuration'
import { convertEthHelper } from '../lib/numbers'
import { networkProviders } from '../lib/networkProvider'

const Connection = ({ nodedrop }) => {
	const { address, network } = useOnboard()

	const [tokenBalance, setTokenBalance] = useState<number | string>(0)

	useEffect(() => {
		if (network === 0 || !address) {
			setTokenBalance(0)
			return
		}

		const networkConfig = NETWORKS_CONFIG[network]

		if (networkConfig) {
			const tokenAddress = networkConfig.TOKEN_ADDRESS
			const provider = networkProviders[network]

			const ERC20ABI = [
				// read balanceOf
				{
					constant: true,
					inputs: [{ name: '_owner', type: 'address' }],
					name: 'balanceOf',
					outputs: [{ name: 'balance', type: 'uint256' }],
					type: 'function',
				},
			]
			const tokenContract = new Contract(tokenAddress, ERC20ABI, provider)
			tokenContract
				.balanceOf(address)
				.then(balance => {
					setTokenBalance(ethers.utils.formatEther(balance))
				})
				.catch(e => console.error('Error on fetching user balance:', e))
		} else {
			setTokenBalance(0)
		}
	}, [address, network])

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
			{network === 4 && (
				<LightBlueButton>
					Network: {getNetworkType(network)}{' '}
				</LightBlueButton>
			)}
			{network === 5 && (
				<LightGreenButton>
					Network: {getNetworkType(network)}{' '}
				</LightGreenButton>
			)}
			{address && (
				<>
					<NavbarButton>
						<p>{convertEthHelper(tokenBalance, 4)} Node</p>
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
