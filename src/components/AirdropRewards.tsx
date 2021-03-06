import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Contract, ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import { isDN, isMainnet } from '../lib/web3-utils'
import Seed from '../assets/seed'
import AddTokenButton from './AddToken'
import { BigCurrency, FlexRow, GreenButton } from './Styles'

import { fetchDnClaimData, fetchEthClaimData } from '../helpers/claim'
import { useOnboard } from '../hooks/useOnboard'
import { ZERO } from '../lib/numbers'
import { getEthTotalClaimable, getXDaiTotalClaimable } from '../lib/claim'

import { abi as MERKLE_ABI } from '../artifacts/MerkleDrop.json'
import config from '../configuration'
import { switchNetwork } from '../lib/metamask'
import * as dropToast from '../lib/notifications/drop'

const { XDAI_CONFIG, MAINNET_CONFIG } = config

function Rewards() {
	const [dnClaimable, setDnClaimable] = useState<ethers.BigNumber>(ZERO)
	const [ethClaimable, setEthClaimable] = useState<ethers.BigNumber>(ZERO)

	const { address, network, provider } = useOnboard()

	async function updateClaimableAmount() {
		if (!address) return

		const dnmount = await getXDaiTotalClaimable(address)
		const ethAmount = await getEthTotalClaimable(address)
		setDnClaimable(dnmount)
		setEthClaimable(ethAmount)
	}

	useEffect(() => {
		updateClaimableAmount().catch(console.error)

		const interval = setInterval(() => {
			updateClaimableAmount().catch(console.error)
		}, 15000)

		return () => clearInterval(interval)
	}, [])

	async function handleClaim(networkConfig, fetchClaimData) {
		if (!provider) return
		try {
			const { MERKLE_ADDRESS_2, MERKLE_ADDRESS } = networkConfig

			const signer = await provider.getSigner()
			const [claimData1, claimData2] = await Promise.all([
				isAddress(MERKLE_ADDRESS)
					? fetchClaimData(address, 1)
					: Promise.resolve(undefined),
				isAddress(MERKLE_ADDRESS_2)
					? fetchClaimData(address, 2)
					: Promise.resolve(undefined),
			])

			const claimData = claimData1 || claimData2
			if (!claimData) return

			const merkleAddress = claimData1 ? MERKLE_ADDRESS : MERKLE_ADDRESS_2

			const merkleContract = new Contract(
				merkleAddress,
				MERKLE_ABI,
				provider,
			)

			const isClaimedResult = await merkleContract
				.connect(signer)
				.isClaimed(claimData.index)
			const canClaim = Boolean(claimData && isClaimedResult === false)

			if (!canClaim) return

			const args = [
				claimData.index,
				address,
				claimData.amount,
				claimData.proof,
			]

			const tx = await merkleContract
				.connect(signer.connectUnchecked())
				.claim(...args)

			dropToast.showPendingRequest(network, tx.hash)

			const { status } = await tx.wait()

			if (status) {
				dropToast.showConfirmedRequest(network, tx.hash)
			} else {
				dropToast.showFailedRequest(network, tx.hash)
			}
		} catch (e) {
			console.error('Error in claiming:', e)
		}
	}

	function handleDnClaim() {
		return handleClaim(XDAI_CONFIG, fetchDnClaimData)
	}

	function handleEthClaim() {
		return handleClaim(MAINNET_CONFIG, fetchEthClaimData)
	}

	return (
		<FlexRow>
			{/* @ts-ignore */}
			<RewardsSection
				disabled={!isMainnet(network)}
				border='2px solid #86bde4'
			>
				<SpaceBetween>
					<label className={isMainnet(network) ? 'blue' : 'disabled'}>
						ETH
					</label>
					{!isMainnet(network) ? (
						<p>
							<b
								aria-hidden='true'
								onClick={() =>
									switchNetwork(config.MAINNET_NETWORK_NUMBER)
								}
							>
								Connect to this network
							</b>{' '}
							to claim your tokens.{' '}
						</p>
					) : (
						<AddTokenButton network={network} />
					)}
				</SpaceBetween>
				<Row>
					<SpaceBetween>
						<Inline>
							<Seed
								fillColor={
									isMainnet(network) ? '#EEF6FC' : '#F4F6F6'
								}
								strokeColor={
									isMainnet(network) ? '#0D91F0' : '#819896'
								}
							/>
							<div>
								<BigCurrency>
									<h1>
										{parseFloat(
											ethers.utils.formatEther(
												ethClaimable,
											),
										).toFixed(2)}
									</h1>
									<h2>NODE</h2>
								</BigCurrency>
								<div>
									<h3>Claimable</h3>
								</div>
							</div>
						</Inline>
						<BlueButton
							onClick={handleEthClaim}
							disabled={
								!isMainnet(network) || !ethClaimable.gt(ZERO)
							}
						>
							Request
						</BlueButton>
					</SpaceBetween>
				</Row>
			</RewardsSection>
			<RewardsSection
				disabled={!isDN(network)}
				border='2px solid #86e4dd'
			>
				<SpaceBetween>
					<label className={isDN(network) ? 'green' : 'disabled'}>
						XDAI
					</label>
					{!isDN(network) ? (
						<p>
							<b
								aria-hidden='true'
								onClick={() =>
									switchNetwork(config.XDAI_NETWORK_NUMBER)
								}
							>
								Connect to this network
							</b>{' '}
							to claim your tokens.{' '}
						</p>
					) : (
						<AddTokenButton network={network} />
					)}
				</SpaceBetween>

				{/* @ts-ignore */}
				<Row disabled={!isDN(network)}>
					<SpaceBetween>
						<Inline>
							<Seed
								fillColor={
									isDN(network) ? '#EEFCFB' : '#F4F6F6'
								}
								strokeColor={
									isDN(network) ? '#248F8B' : '#819896'
								}
							/>
							<div>
								<BigCurrency>
									<h1>
										{parseFloat(
											ethers.utils.formatEther(
												dnClaimable,
											),
										).toFixed(2)}
									</h1>
									<h2>xNODE</h2>
								</BigCurrency>
								<div>
									<h3>Claimable</h3>
								</div>
							</div>
						</Inline>

						<GreenButton
							onClick={handleDnClaim}
							disabled={!isDN(network) || !dnClaimable.gt(ZERO)}
						>
							Request
						</GreenButton>
					</SpaceBetween>
				</Row>
			</RewardsSection>
		</FlexRow>
	)
}

const BlueButton = styled.button`
	background: ${props =>
		props.disabled
			? '#DDE3E3'
			: 'linear-gradient(99.61deg, #86BDE4 -0.13%, #0D91F0 99.3%);'};
	border: solid 0px transparent;
	border-radius: 27px;
	font-family: 'Inter-Bold';
	font-weight: bold;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	color: white;
	cursor: pointer;
	padding: 8px 16px;
	box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
		0px 0px 8px rgba(8, 43, 41, 0.06);
	&:hover {
		background: ${props =>
			props.disabled
				? '#DDE3E3'
				: 'linear-gradient(99.61deg, #7cadd0 -0.13%, #075c98 99.3%);'};
		transition: all 0.25s ease-in-out;
	}
`

const Row = styled.div`
	box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
		0px 0px 8px rgba(8, 43, 41, 0.06);
	border-radius: 16px;
	padding: 12px;
	h3 {
		font-family: 'Inter';
		font-size: 12px;
		line-height: 14px;
		display: flex;
		align-items: center;
		color: #5c706f;
		margin-bottom: 0;
		margin-top: 2px;
	}
`

const RewardsSection = styled.section`
	flex: 1;
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	padding: 16px;
	border-radius: 24px;
	border: ${props => (props.disabled ? '1px solid #dde3e3' : props.border)};
	background: ${props => (props.disabled ? '#F4F6F6' : 'white')};
	label {
		background: #eefcfb;
		border-radius: 16px;
		padding: 4px 8px;
		font-family: 'Inter-Bold';
		font-weight: bold;
		font-size: 12px;
		line-height: 15px;
		color: #23c8bc;
		margin: 8px 0;
		&.blue {
			color: #0d91f0;
			background: #eef6fc;
		}
		&.disabled {
			color: #819896;
			background: #f4f6f6;
		}
	}
	p {
		font-family: Inter;
		font-size: 12px;
		line-height: 14px;
		display: flex;
		align-items: center;
		color: #5c706f;
		b {
			cursor: pointer;
			font-family: 'Inter-Bold';
			color: #0d91f0;
			text-decoration-line: underline;
			padding-right: 5px;
		}
	}
`
const Inline = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-wrap: wrap;
	div {
		padding-left: 5px;
	}
`

const SpaceBetween = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
`

export default Rewards
