import React, { useEffect, useState } from 'react'
import { BigNumber, constants, Contract, utils } from 'ethers'
import { isAddress } from 'ethers/lib/utils'

import styled from 'styled-components'
import { isDN, isMainnet, networkAllowed } from '../lib/web3-utils'
import { switchNetwork } from '../lib/metamask'
import Seed from '../assets/seed'
import Time from '../assets/time'
import { BigCurrency, GreenButton } from './Styles'

import { useOnboard } from '../hooks/useOnboard'

import { abi as TOKEN_DISTRO_ABI } from '../artifacts/TokenDistro.json'
import { networkProviders } from '../lib/networkProvider'
import {
	showConfirmedClaim,
	showFailedClaim,
	showPendingClaim,
} from '../lib/notifications/claim'
import AddTokenButton from './AddToken'
import NetworkLabel from './NetworkLabel'
import config from '../configuration'

const { NETWORKS_CONFIG } = config

interface ITokenDistro {
	claimable: BigNumber
	locked: BigNumber
}

function Rewards() {
	const { connect, address, network, isReady, provider } = useOnboard()

	const [ethLocked, setEthLocked] = useState<BigNumber>(constants.Zero)
	const [xDaiLocked, setXDaiLocked] = useState<BigNumber>(constants.Zero)
	const [ethClaimable, setEthClaimable] = useState<BigNumber>(constants.Zero)
	const [xDaiClaimable1, setXDaiClaimable1] = useState<BigNumber>(
		constants.Zero,
	)
	const [xDaiClaimable2, setXDaiClaimable2] = useState<BigNumber>(
		constants.Zero,
	)
	const [xDaiClaimable, setXDaiClaimable] = useState<BigNumber>(
		constants.Zero,
	)

	async function handleClaim(tokenDistroAddress: string): Promise<void> {
		if (!isAddress(tokenDistroAddress)) return

		const signer = provider.getSigner().connectUnchecked()

		const tokenDistro = new Contract(
			tokenDistroAddress,
			TOKEN_DISTRO_ABI,
			signer,
		)

		const tx = await tokenDistro.claim()

		showPendingClaim(network, tx.hash)

		const { status } = await tx.wait()

		if (status) {
			showConfirmedClaim(network, tx.hash)
		} else {
			showFailedClaim(network, tx.hash)
		}
	}

	// eslint-disable-next-line no-shadow
	async function handleEthClaim() {
		await handleClaim(
			NETWORKS_CONFIG[config.MAINNET_NETWORK_NUMBER].TOKEN_DISTRO_ADDRESS,
		)
	}

	// eslint-disable-next-line no-shadow
	function handleXDaiClaim() {
		const { TOKEN_DISTRO_ADDRESS, TOKEN_DISTRO_ADDRESS_2 } =
			NETWORKS_CONFIG[config.XDAI_NETWORK_NUMBER]

		const promises: Array<Promise<void>> = []

		if (!xDaiClaimable1.isZero()) {
			const promise = handleClaim(TOKEN_DISTRO_ADDRESS).catch(e => {
				console.error('Error in claiming xDai token distro:', e)
			})

			promises.push(promise)
		}

		if (!xDaiClaimable2.isZero()) {
			const promise = handleClaim(TOKEN_DISTRO_ADDRESS_2).catch(e => {
				console.error('Error in claiming xDai token distro 2:', e)
			})
			promises.push(promise)
		}

		return Promise.all(promises)
	}

	async function getTokenDistroAmounts(
		// eslint-disable-next-line no-shadow
		address: string,
		tokenDistroAddress: string,
		// eslint-disable-next-line no-shadow
		networkNumber: number,
	): Promise<ITokenDistro> {
		if (!isAddress(tokenDistroAddress)) {
			return {
				claimable: constants.Zero,
				locked: constants.Zero,
			}
		}

		const tokenDistro = new Contract(
			tokenDistroAddress,
			TOKEN_DISTRO_ABI,
			networkProviders[networkNumber],
		)

		const balances = await tokenDistro.balances(address)
		const claimable = await tokenDistro.claimableNow(address)

		const locked = balances[0].sub(balances[1])

		return { claimable, locked }
	}

	async function updateTokenDistroAmounts() {
		if (!isAddress(address)) return

		const { claimable: _ethClaimable, locked: _ethLocked } =
			await getTokenDistroAmounts(
				address,
				NETWORKS_CONFIG[config.MAINNET_NETWORK_NUMBER]
					.TOKEN_DISTRO_ADDRESS,
				config.MAINNET_NETWORK_NUMBER,
			)

		const { claimable: _xDaiClaimable1, locked: _xDaiLocked1 } =
			await getTokenDistroAmounts(
				address,
				NETWORKS_CONFIG[config.XDAI_NETWORK_NUMBER]
					.TOKEN_DISTRO_ADDRESS,
				config.XDAI_NETWORK_NUMBER,
			)

		const { claimable: _xDaiClaimable2, locked: _xDaiLocked2 } =
			await getTokenDistroAmounts(
				address,
				NETWORKS_CONFIG[config.XDAI_NETWORK_NUMBER]
					.TOKEN_DISTRO_ADDRESS_2,
				config.XDAI_NETWORK_NUMBER,
			)

		setXDaiClaimable1(_xDaiClaimable1)
		setXDaiClaimable2(_xDaiClaimable2)

		// eslint-disable-next-line no-underscore-dangle
		const _xDaiLocked = _xDaiLocked1.add(_xDaiLocked2)
		// eslint-disable-next-line no-underscore-dangle
		const _xDaiClaimable = _xDaiClaimable1.add(_xDaiClaimable2)

		setEthLocked(_ethLocked || constants.Zero)
		setEthClaimable(_ethClaimable || constants.Zero)
		setXDaiLocked(_xDaiLocked || constants.Zero)
		setXDaiClaimable(_xDaiClaimable || constants.Zero)
	}

	useEffect(() => {
		updateTokenDistroAmounts()

		const interval = setInterval(() => {
			updateTokenDistroAmounts()
		}, 15000)

		return () => clearInterval(interval)
	}, [address])

	if (!isReady) {
		return (
			<WarnSection>
				<div>
					<WarnMessage className='margin-bottom'>
						Please connect to a wallet
					</WarnMessage>
					<GreenButton
						onClick={connect}
						css={`
							margin-top: 25px;
						`}
					>
						Connect Wallet
					</GreenButton>
				</div>
			</WarnSection>
		)
	}
	if (!networkAllowed(network)) {
		return (
			<WarnSection>
				<WarnMessage>Please connect to Ethereum or xDai</WarnMessage>
			</WarnSection>
		)
	}

	return (
		<>
			<RewardsSection
				disabled={!isMainnet(network)}
				border='2px solid #86bde4'
			>
				<SpaceBetween>
					<NetworkLabel network={config.MAINNET_NETWORK_NUMBER} />
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
				<br />
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
											utils.formatEther(ethClaimable),
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
								!isMainnet(network) || ethClaimable.isZero()
							}
						>
							Claim
						</BlueButton>
					</SpaceBetween>
				</Row>
				<Row>
					<SpaceBetween>
						<Inline>
							<Time
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
											utils.formatEther(ethLocked),
										).toFixed(2)}
									</h1>
									<h2>NODE</h2>
								</BigCurrency>
								<div>
									<h3>In Reservoir</h3>
								</div>
							</div>
						</Inline>
					</SpaceBetween>
				</Row>
			</RewardsSection>
			<RewardsSection
				disabled={!isDN(network)}
				border='2px solid #86e4dd'
			>
				<SpaceBetween>
					<NetworkLabel network={config.XDAI_NETWORK_NUMBER} />
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
				<br />
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
											utils.formatEther(xDaiClaimable),
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
							onClick={handleXDaiClaim}
							disabled={!isDN(network) || xDaiClaimable.isZero()}
						>
							Claim
						</GreenButton>
					</SpaceBetween>
				</Row>
				<Row>
					<SpaceBetween>
						<Inline>
							<Time
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
											utils.formatEther(xDaiLocked),
										).toFixed(2)}
									</h1>
									<h2>xNODE</h2>
								</BigCurrency>
								<div>
									<h3>In Reservoir</h3>
								</div>
							</div>
						</Inline>
					</SpaceBetween>
				</Row>
			</RewardsSection>
		</>
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
	padding: 8px 16px;
	cursor: pointer;
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
	margin: 4px 0;
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

const WarnMessage = styled.div`
	font-family: 'Inter';
	font-size: 16px;
	display: flex;
	align-items: center;
	text-align: center;
	color: #5c706f;
	margin: auto;
	&.margin-bottom {
		margin-bottom: 20px;
	}
`
const WarnSection = styled.section`
	background-color: white;
	height: 212px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 16px;
	box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
		0px 2px 8px rgba(8, 43, 41, 0.06);
	border-radius: 16px;
	flex-grow: 1;
	margin: 0 10px;
`

const RewardsSection = styled.section`
	min-height: 212px;
	height: auto;
	padding: 16px;
	box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
		0px 2px 8px rgba(8, 43, 41, 0.06);
	border-radius: 16px;
	border: ${props => (props.disabled ? '1px solid #dde3e3' : props.border)};
	flex-basis: 100%;
	margin: 10px;
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

export default React.memo(Rewards)
