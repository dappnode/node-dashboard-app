import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { networkAllowed } from '../lib/web3-utils'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'

import { useOnboard } from '../hooks/useOnboard'

import { Button, GreenButton, Inter400, Inter700, SpaceBetween } from '../components/Styles'

import AirdropRewards from '../components/AirdropRewards'

function Airdrop() {

  const { connect, network, isReady } = useOnboard();

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Head>
        <title>NODEdrop</title>
      </Head>
      <div id="outer-container" style={{ height: '100%' }}>
        <Rectangle />
        <Main id="page-wrap" network={network}>
          <Navbar title="NODEdrop" openSidebar={() => setIsOpen(true)} />

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

            { !isReady && (
                <WarnSection>
                  <div>
                    <WarnMessage className="margin-bottom">
                      Please connect to a wallet
                    </WarnMessage>
                    <GreenButton
                      onClick={connect}
                      css={`margin-top: 25px;`}
                    >
                      Connect Wallet
                    </GreenButton>

                  </div>
                </WarnSection>
              )
            }

            { isReady && !networkAllowed(network) && (
                <WarnSection>
                  <WarnMessage>Please connect to the right network</WarnMessage>
                </WarnSection>
              )
            }
            { isReady && networkAllowed(network) && (
              <>
                <Inter700 className="large">Congrats! You’re ready to claim your NODEdrop.</Inter700>
                <Inter400Subtitle>Claim your rewards in the xDAI and ETH networks.</Inter400Subtitle>
                <AirdropRewards />
              </>
              )
            }
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
    case 4:
      return `
        background: url('/assets/eth-background.svg'), linear-gradient(116.82deg, #C8E4F8 0%, #EEF6FC 100%, #F4F6F6 100%);
      `;
    case 5:
      return `
        background: url('/assets/dn-background.svg'), linear-gradient(116.82deg, #c7eeec 0%, #f4f6f6 100%);
      `;
    default:
      return "linear-gradient(116.82deg, #DDE3E3 0%, #FFFFFF 100%)";
  }
};

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
`

const Rectangle = styled.div`
  height: 2px;
  width: 100%;
  background: #54D4CB;
  box-shadow: 0px 0px 12px #54D4CB;
`

export const Flex = styled.div`
  display: flex;
  align-items: center;
`

const Inter400Subtitle = styled(Inter400)`
  color: #5C706F;
  font-size: 20px;
  line-height: 28px;
`

const TextGradient = styled.span`
  background: linear-gradient(99.61deg, #1EFFEF -0.13%, #2F78BC 99.3%);
  background-size: 100%;
  -moz-background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`

const QuizSection = styled.div`
  margin: 110px auto;
  max-width: 800px;
  padding: 18px 32px;
  border-radius: 16px;
  background: #FFFFFF;
  box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04), 0px 2px 16px rgba(8, 43, 41, 0.06);
`

const QuizQuestion = styled.div`
  padding: 24px;
  cursor: pointer;
  margin-bottom: 16px;
  border-radius: 16px;
  border: 1px solid #BECAC9;

  &:hover {
    transition: .3s;
    border: 1px solid #86E4DD;
  }
`

const QuizNumber = styled.span`
  font-family: 'Inter-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  color: #C4F3EF;
`

export default Airdrop