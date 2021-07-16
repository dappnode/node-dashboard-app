import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { networkAllowed } from '../lib/web3-utils'
import Navbar from '../components/Navbar'

import { useOnboard } from '../hooks/useOnboard'

import {
	GRADIENT_TEXT,
	Button,
	GreenButton,
	Input,
	Inter400,
	Inter700,
} from '../components/Styles'

import AirdropRewards from '../components/AirdropRewards'
import { config } from '../configuration'
import NodeDropHint from '../components/NodeDropHint'
import Stepper from '../components/Stepper'
import Story from '../components/Story'
import Quiz from '../components/Quiz'

type componentStateType = 'welcome' | 'rewards' | 'about' | 'quiz' | 'claim'

function Nodedrop() {
	const { connect, network, isReady } = useOnboard()

	const [address, setAddress] = useState<string>('')
	const [pendingRewards, setPendingRewards] = useState<boolean>(true)
	const [componentState, setComponentState] =
		useState<componentStateType>('welcome')

	return (
		<>
			<Head>
				<title>NODEdrop</title>
			</Head>
			<div id='outer-container' style={{ height: '100%' }}>
				<Rectangle />
				<Main id='page-wrap' network={network}>
					{/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
					<Navbar title='NODEdrop' openSidebar={() => {}} />

					<Stepper />

					<div style={{ margin: '50px auto' }} />

					{componentState === 'welcome' && (
						<Section>
							<Inter700 className='large'>
								Welcome to the NODEdrop!
							</Inter700>
							<Inter400>
								First,{' '}
								<b>
									connect your wallet or check an Ethereum
									address
								</b>{' '}
								to check for rewards.
							</Inter400>
							<Row>
								<Column
									style={{
										paddingRight: '32px',
										alignItems: 'center',
										justifyContent: 'center',
										borderRight:
											'1px solid rgba(0, 0, 0, 0.08)',
									}}
								>
									<div
										style={{
											width: '100%',
											height: '100%',
											display: 'flex',
											cursor: 'pointer',
											alignItems: 'center',
											justifyContent: 'center',
											borderRadius: '8px',
											border: '2px solid #86E4DD',
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '10px',
											}}
										>
											<img
												alt='link'
												src='/assets/link.svg'
											/>{' '}
											Connect your wallet
										</div>
									</div>
								</Column>
								<Column style={{ paddingLeft: '32px' }}>
									<Input
										type='text'
										placeholder='Address'
										onChange={e =>
											setAddress(e.target.value)
										}
									/>
									<GreenButton
										disabled={!address}
										style={{ marginTop: '10px' }}
										onClick={() =>
											setComponentState('rewards')
										}
									>
										Check your NODEdrop!
									</GreenButton>
								</Column>
							</Row>
						</Section>
					)}

					{componentState === 'rewards' && pendingRewards && (
						<FixedSection>
							<Inter700 className='large'>
								1000 NODE tokens are waiting for you!
							</Inter700>
							<Inter400Subtitle>
								Now take some minutes to learn a little bit
								about what we do. Complete the following steps
								to claim your airdrop.
							</Inter400Subtitle>
							<img
								alt='coins'
								src='/assets/coins.svg'
								style={{
									display: 'block',
									margin: '0 auto',
								}}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									columnGap: '16px',
								}}
							>
								<Button
									onClick={() => setComponentState('welcome')}
								>
									Try another address
								</Button>
								<GreenButton
									onClick={() => setComponentState('about')}
								>
									Let&apos;s go!
								</GreenButton>
							</div>
						</FixedSection>
					)}

					{componentState === 'rewards' && !pendingRewards && (
						<FixedSection>
							<Inter700 className='large'>
								You don’t have an airdrop assigned to your
								address.
							</Inter700>
							<Inter400Subtitle>
								Sorry! It looks like you didn’t receive an
								airdrop to this address. Try another address, or
								continue learning about how you can participate
								in the DappNode ecosystem.
							</Inter400Subtitle>
							<img
								alt='error'
								src='/assets/error.svg'
								style={{
									display: 'block',
									margin: '50px auto',
								}}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<Button
									onClick={() => setComponentState('welcome')}
								>
									Try another address
								</Button>
							</div>
						</FixedSection>
					)}

					{componentState === 'about' && (
						<FixedSection>
							<Story
								setQuiz={() => setComponentState('quiz')}
								setRewards={() => setComponentState('rewards')}
							/>
						</FixedSection>
					)}

					{componentState === 'quiz' && (
						<FixedSection>
							<Quiz setClaim={() => setComponentState('claim')} />
						</FixedSection>
					)}

					{componentState === 'claim' && !isReady && (
						<Section>
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
						</Section>
					)}

					{componentState === 'claim' &&
						isReady &&
						!networkAllowed(network) && (
							<Section>
								<WarnSection>
									<WarnMessage>
										Please connect to the right network
									</WarnMessage>
								</WarnSection>
							</Section>
						)}

					{componentState === 'claim' && networkAllowed(network) && (
						<>
							<NodeDropHint />
							<Section>
								<Inter700 className='large'>
									Congrats! You’re ready to claim your{' '}
									<GRADIENT_TEXT>NODEdrop.</GRADIENT_TEXT>
								</Inter700>
								<Inter400Subtitle>
									Claim your rewards in the xDai and ETH
									Mainnet.
								</Inter400Subtitle>
								<AirdropRewards />
							</Section>
						</>
					)}
				</Main>
			</div>
		</>
	)
}

const handleMainBackground = network => {
	switch (network) {
		case config.MAINNET_NETWORK_NUMBER:
			return `
        background: url('/assets/eth-background.svg'), linear-gradient(116.82deg, #C8E4F8 0%, #EEF6FC 100%, #F4F6F6 100%);
      `
		case config.XDAI_NETWORK_NUMBER:
			return `
        background: url('/assets/dn-background.svg'), linear-gradient(116.82deg, #c7eeec 0%, #f4f6f6 100%);
      `
		default:
			return 'linear-gradient(116.82deg, #DDE3E3 0%, #FFFFFF 100%)'
	}
}

const Row = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
`

const Column = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	flex: 1;
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
	height: 212px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	padding: 16px;
	flex-grow: 1;
`

const Main = styled.main`
	${({ network }) => handleMainBackground(network)};
	background-position: bottom right;
	background-repeat: no-repeat;
	min-height: 100vh;
`

const Rectangle = styled.div`
	height: 2px;
	width: 100%;
	background: #54d4cb;
	box-shadow: 0px 0px 12px #54d4cb;
`

export const Flex = styled.div`
	display: flex;
	align-items: center;
`

const Section = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin: 110px auto;
	max-width: 800px;
	padding: 18px 32px;
	border-radius: 16px;
	background: #ffffff;
	box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
		0px 2px 16px rgba(8, 43, 41, 0.06);
`

const FixedSection = styled(Section)`
	min-height: 450px;
`

const Inter400Subtitle = styled(Inter400)`
	color: #5c706f;
	font-size: 20px;
	line-height: 28px;
`

export default Nodedrop
