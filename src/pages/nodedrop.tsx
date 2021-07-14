import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { networkAllowed } from '../lib/web3-utils'
import Navbar from '../components/Navbar'

import { useOnboard } from '../hooks/useOnboard'

import { GreenButton, Inter400, Inter700 } from '../components/Styles'

import AirdropRewards from '../components/AirdropRewards'
import { config } from '../configuration'

function Nodedrop() {
	const { connect, network, isReady } = useOnboard()

	const [, setIsOpen] = useState(false)

	return (
		<>
			<Head>
				<title>NODEdrop</title>
			</Head>
			<div id='outer-container' style={{ height: '100%' }}>
				<Rectangle />
				<Main id='page-wrap' network={network}>
					<Navbar
						title='NODEdrop'
						openSidebar={() => setIsOpen(true)}
					/>

					{/* <QuizSection>
            <Inter700 className="large"><TextGradient>1000 NODE</TextGradient> &nbsp; tokens are waiting for you!</Inter700>
            <Inter400Subtitle>
              Now take some minutes to learn a little bit about what we do. Complete the following steps to claim your airdrop.
            </Inter400Subtitle>
            <img alt="coins" src="/assets/coins.svg" style={{ display: 'block', margin: '0 auto' }}/>
            <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '16px' }}>
              <Button>Try another address</Button>
              <GreenButton>Let&apos;s go!</GreenButton>
            </div>
          </QuizSection>

          <div style={{ margin: '50px auto' }} />

          <QuizSection>
            <Inter700 className="large">You don’t have an airdrop assigned to your address.</Inter700>
            <Inter400Subtitle>
              Sorry! It looks like you didn’t receive an airdrop to this address. Try another address, or continue learning about how you can participate in the DappNode ecosystem.
            </Inter400Subtitle>
            <img alt="error" src="/assets/error.svg" style={{ display: 'block', margin: '50px auto' }}/>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button>Try another address</Button>
            </div>
          </QuizSection>

          <div style={{ margin: '50px auto' }} />

          <QuizSection>
            <Inter700 className="large">First, a little bit about &nbsp;<TextGradient>DAppNode</TextGradient></Inter700>
            <Inter700>What is DappNode?</Inter700>
            <Inter400Subtitle>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.            </Inter400Subtitle>
            <Inter400Subtitle>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.            </Inter400Subtitle>
            <SpaceBetween style={{ margin: '16px auto' }}>
              <QuizNumber>2/3</QuizNumber>
              <div>
                <Button style={{ marginRight: '16px' }}>Back</Button>
                <GreenButton>Next</GreenButton>
              </div>
            </SpaceBetween>
          </QuizSection>

          <div style={{ margin: '50px auto' }} />

          <QuizSection>
            <Inter700 className="large">Let’s check what you’ve learned so far.</Inter700>
            <Inter700>What is DappNode?</Inter700>
            <QuizQuestion>Infrastructure for the decentralized world</QuizQuestion>
            <QuizQuestion>Infrastructure for the decentralized world</QuizQuestion>
            <QuizQuestion>Infrastructure for the decentralized world</QuizQuestion>
            <SpaceBetween style={{ margin: '16px auto' }}>
              <QuizNumber>1/3</QuizNumber>
              <GreenButton>Submit</GreenButton>
            </SpaceBetween>
          </QuizSection> */}

					<div style={{ margin: '50px auto' }} />

					<QuizSection>
						{!isReady && (
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
						)}

						{isReady && !networkAllowed(network) && (
							<WarnSection>
								<WarnMessage>
									Please connect to the right network
								</WarnMessage>
							</WarnSection>
						)}
						{isReady && networkAllowed(network) && (
							<>
								<Inter700 className='large'>
									Congrats! You’re ready to claim your
									NODEdrop.
								</Inter700>
								<Inter400Subtitle>
									Claim your rewards in the xDai and ETH
									Mainnet.
								</Inter400Subtitle>
								<AirdropRewards />
							</>
						)}
					</QuizSection>

					{/* <div style={{ margin: '20px auto' }} />

          <QuizSection>
            <Flex>
              <Inter700>Hey, there’s a <TextGradient>&nbsp;54.32% APR&nbsp;</TextGradient> waiting for you in your dashboard.</Inter700>
              <GreenButton>Go to dashboard</GreenButton>
            </Flex>
          </QuizSection> */}
				</Main>
				{/* <Sidebar
          isOpen={isOpen}
          closeSidebar= {() => setIsOpen(false)}
        /> */}
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

const Inter400Subtitle = styled(Inter400)`
	color: #5c706f;
	font-size: 20px;
	line-height: 28px;
`

const QuizSection = styled.div`
	margin: 110px auto;
	max-width: 800px;
	padding: 18px 32px;
	border-radius: 16px;
	background: #ffffff;
	box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
		0px 2px 16px rgba(8, 43, 41, 0.06);
`

export default Nodedrop
