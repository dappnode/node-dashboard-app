import React, { Component, useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import BurgerMenu from 'react-burger-menu'
import { constants, utils } from 'ethers'
import ConnectionInfo from './ConnectionInfo'
import {
	Inter500,
	Inter400,
	RoundedCard,
	BigCurrency,
	GreenButton,
	WhiteGreenButtonLink,
	Inter500Green,
} from './Styles'
import useMobileScreen from '../hooks/useMobileScreen'
import { useOnboard } from '../hooks/useOnboard'
import { isMainnet, shortenAddress } from '../lib/web3-utils'
import { convertEthHelper } from '../lib/numbers'
import { useTokenBalance } from '../hooks/useTokenBalance'
import AppContext from '../hooks/AppContext'
import config from '../configuration'

const { MAINNET_CONFIG } = config

interface SideBarBalance {
	total: string
	walletDN: string
	walletMainnet: string
	stakedLP: string
	stakedBalance: string
	harvestDN: string
	harvestMainnet: string
	lockedDN: string
	lockedMainnet: string
	claimableDN: string
	claimableMainnet: string
}

// eslint-disable-next-line @typescript-eslint/ban-types
class MenuWrap extends Component<{}, { hidden: boolean }> {
	constructor(props) {
		super(props)
		this.state = {
			hidden: false,
		}
	}

	componentDidUpdate() {
		setTimeout(() => {
			this.show()
		}, 20)
	}

	show() {
		this.setState({ hidden: false })
	}

	render() {
		let style

		const { children } = this.props
		const { hidden } = this.state

		if (hidden) {
			style = { display: 'none' }
		}

		return (
			<div style={style} className='right'>
				{children}
			</div>
		)
	}
}

function Sidebar({ isOpen, closeSidebar }) {
	const Menu = BurgerMenu.slide
	const [copyText, setCopyText] = useState<string>('Copy')
	const { address, network, disconnect } = useOnboard()
	const { tokenBalanceDN, tokenBalanceMainnet } = useTokenBalance()
	const [sideBarBalance, setSideBarBalance] = useState<SideBarBalance>({
		total: '',
		walletDN: '',
		walletMainnet: '',
		stakedLP: '',
		stakedBalance: '',
		harvestDN: '',
		harvestMainnet: '',
		lockedDN: '',
		lockedMainnet: '',
		claimableDN: '',
		claimableMainnet: '',
	})

	const appContext = useContext(AppContext)

	function copyAddressToClipboard() {
		navigator.clipboard.writeText(address)
		setCopyText('Copied')
		setTimeout(() => {
			setCopyText('Copy')
		}, 1000)
	}

	function disconnectWallet() {
		disconnect()
		closeSidebar()
	}

	function updateTokenBalance() {
		const total = convertEthHelper(
			utils.formatEther(
				tokenBalanceDN
					.add(tokenBalanceMainnet)
					.add(
						utils.parseEther(
							appContext.uniswap?.earned?.amount?.toString(10) ||
								'0',
						),
					)
					.add(
						utils.parseEther(
							appContext.sushiswap?.earned?.amount?.toString(
								10,
							) || '0',
						),
					)
					.add(
						utils.parseEther(
							appContext.uniswapLPNODE?.toString() || '0',
						),
					)
					.add(
						utils.parseEther(
							appContext.sushiswapLPNODE?.toString() || '0',
						),
					)
					.add(
						utils.parseEther(
							appContext.streamDN?.stakedLpTokens?.toString(10) ||
								'0',
						),
					)
					.add(
						utils.parseEther(
							appContext.streamDN?.earned?.amount?.toString(10) ||
								'0',
						),
					)
					.add(
						utils.parseEther(
							appContext.streamMainnet?.stakedLpTokens?.toString(
								10,
							) || '0',
						),
					)
					.add(
						utils.parseEther(
							appContext.streamMainnet?.earned?.amount?.toString(
								10,
							) || '0',
						),
					)
					.add(appContext.xDaiLocked ?? constants.Zero)
					.add(appContext.ethLocked ?? constants.Zero),
			),
			4,
		)
		const walletDN = convertEthHelper(utils.formatEther(tokenBalanceDN), 4)
		const walletMainnet = convertEthHelper(
			utils.formatEther(tokenBalanceMainnet),
			4,
		)
		const stakedLP = convertEthHelper(
			parseFloat(appContext.uniswapLPNODE?.toString() || '0') +
				parseFloat(appContext.sushiswapLPNODE?.toString() || '0'),
			4,
		)
		const stakedBalance = convertEthHelper(
			appContext.streamDN?.stakedLpTokens?.toNumber() +
				appContext.streamMainnet?.stakedLpTokens?.toNumber(),
			4,
		)
		const harvestDN = convertEthHelper(
			appContext.streamDN?.earned?.amount?.toNumber(),
			4,
		)
		const harvestMainnet = convertEthHelper(
			appContext.uniswap?.earned?.amount?.toNumber() +
				appContext.sushiswap?.earned?.amount?.toNumber() +
				appContext.streamMainnet?.earned?.amount?.toNumber(),
			4,
		)
		const lockedDN = parseFloat(
			utils.formatEther(appContext.xDaiLocked || constants.Zero),
		).toFixed(4)
		const lockedMainnet = parseFloat(
			utils.formatEther(appContext.ethLocked || constants.Zero),
		).toFixed(4)
		const claimableDN = parseFloat(
			utils.formatEther(appContext.xDaiClaimable || constants.Zero),
		).toFixed(4)
		const claimableMainnet = parseFloat(
			utils.formatEther(appContext.ethClaimable || constants.Zero),
		).toFixed(4)
		setSideBarBalance({
			total,
			walletDN,
			walletMainnet,
			stakedLP,
			stakedBalance,
			harvestDN,
			harvestMainnet,
			lockedDN,
			lockedMainnet,
			claimableDN,
			claimableMainnet,
		})
	}

	useEffect(() => {
		updateTokenBalance()
	}, [
		address,
		appContext.uniswap,
		appContext.sushiswap,
		appContext.streamMainnet,
		appContext.streamDN,
		appContext.xDaiClaimable,
		appContext.ethClaimable,
		appContext.xDaiLocked,
		appContext.ethLocked,
	])

	return (
		<MenuWrap>
			<Menu
				id='slide'
				pageWrapId='page-wrap'
				outerContainerId='outer-container'
				right
				isOpen={isOpen}
				customBurgerIcon={false}
				width={!useMobileScreen() ? 440 : '100%'}
				onClose={closeSidebar}
			>
				<Top>
					<ConnectionInfo />
				</Top>
				<div style={{ padding: '0 15px' }}>
					<BalanceBox>
						<Inter500>
							<b>Connected wallet</b>
						</Inter500>
						<DisconnectButton onClick={disconnectWallet}>
							Disconnect
						</DisconnectButton>
					</BalanceBox>
					<SidebarCard>
						<SpaceBetween>
							<Inter400>
								Address
								{address && (
									<div>
										<b>{shortenAddress(address)}</b>
									</div>
								)}
							</Inter400>
							<Inter500Green onClick={copyAddressToClipboard}>
								{copyText}
							</Inter500Green>
						</SpaceBetween>
						<SpaceBetween>
							<Inter400>
								Network{' '}
								<div>
									<b>
										{isMainnet(network)
											? 'Ethereum Mainnet'
											: 'xDai'}
									</b>
								</div>
							</Inter400>
							{/* <Inter500Green
								onClick={() => {
									const win = window.open(
										'https://omni.xdaichain.com/bridge',
										'_blank',
									)
									if (win) win.focus()
								}}
							>
								Learn how to change{' '}
								<img
									alt='link'
									src='/assets/external-link-green.svg'
								/>
							</Inter500Green> */}
						</SpaceBetween>
						<SpaceBetween>
							<div />
							<GreenButton
								disabled={false}
								className='long'
								onClick={() => {
									const win = window.open(
										'https://omni.xdaichain.com/bridge',
										'_blank',
									)
									if (win) win.focus()
								}}
							>
								Transfer funds
							</GreenButton>
						</SpaceBetween>
					</SidebarCard>
					<br />
					<Inter500>
						<b>Your NODE balance</b>
					</Inter500>
					<SidebarCard>
						<div>
							<BigCurrency>
								<h1>{sideBarBalance.total}</h1>
								<h2>NODE</h2>
							</BigCurrency>
							<br />
							<BalanceBox>
								<Inter500>NODE in your ETH wallet</Inter500>
								<Inter400>
									{sideBarBalance.walletMainnet}
								</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>xNODE in your xDai wallet</Inter500>
								<Inter400>{sideBarBalance.walletDN}</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>NODE in LP</Inter500>
								<Inter400>{sideBarBalance.stakedLP}</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>NODE in Staking</Inter500>
								<Inter400>
									{sideBarBalance.stakedBalance}
								</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>Pending harvest in ETH</Inter500>
								<Inter400>
									{sideBarBalance.harvestMainnet}
								</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>Pending harvest in xDai</Inter500>
								<Inter400>{sideBarBalance.harvestDN}</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>Locked in ETH Network</Inter500>
								<Inter400>
									{sideBarBalance.lockedMainnet}
								</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>Locked in xDai Network</Inter500>
								<Inter400>{sideBarBalance.lockedDN}</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>Claimable in ETH Network</Inter500>
								<Inter400>
									{sideBarBalance.claimableMainnet}
								</Inter400>
							</BalanceBox>
							<BalanceBox>
								<Inter500>Claimable in xDai Network</Inter500>
								<Inter400>
									{sideBarBalance.claimableDN}
								</Inter400>
							</BalanceBox>
							<br />
							<WhiteGreenButtonLink
								onClick={() => {
									const win = window.open(
										`https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=${MAINNET_CONFIG.TOKEN_ADDRESS}&use=V2`,
										'_blank',
									)
									if (win) win.focus()
								}}
							>
								Get more NODE{' '}
								<img
									alt='link'
									src='/assets/external-link-green.svg'
								/>
							</WhiteGreenButtonLink>
						</div>
					</SidebarCard>
					<br />
				</div>
			</Menu>
		</MenuWrap>
	)
}

const BalanceBox = styled.div`
	display: flex;
	justify-content: space-between;
`

const SidebarCard = styled(RoundedCard)`
	padding: 24px;
`
const Top = styled.div`
	position: absolute !important;
	border-top-left-radius: 32px;
	top: 0;
	left: 0;
	display: flex !important;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	height: 64px;
	width: 100%;
	background: white;
	&:focus-visible {
		outline: none;
	}
`

export const SpaceBetween = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
	div {
		label {
			font-family: Inter;
			font-style: normal;
			font-size: 12px;
			line-height: 12px;
			letter-spacing: 0em;
			color: gray;
			text-transform: uppercase;
		}
	}
`

const DisconnectButton = styled(Inter500Green)`
	color: #222a29;
`

export default Sidebar
