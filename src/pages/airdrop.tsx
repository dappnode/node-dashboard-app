import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'

import Sidebar from '../components/SideBar'
import { useOnboard } from '../hooks/useOnboard'

import { GreenButton, Inter400, Inter700, SpaceBetween } from '../components/Styles'

import AirdropRewards from '../components/AirdropRewards'

function Airdrop() {

  const { network } = useOnboard();

  console.log(network)

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
          <div style={{ position: 'absolute', bottom: '0', right: '5%', zIndex: 0 }}>
            { network === 100 && <img alt="Ethereum" src='/assets/dn-background.svg' />}
            { network === 4 && <img alt="DAppNode" src='/assets/eth-background.svg' />}
          </div>
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
          </QuizSection>

          <div style={{ margin: '50px auto' }} />

          <QuizSection>
            <Inter700 className="large">Congrats! You’re ready to claim your NODEdrop.</Inter700>
            <Inter400>Claim your rewards in the xDAI and ETH networks.</Inter400>
            <AirdropRewards />
          </QuizSection>

          <div style={{ margin: '20px auto' }} />

          <QuizSection>
            <Flex>
              <Inter700>Hey, there’s a 54.32% APR waiting for you in your dashboard.</Inter700>
              <GreenButton>Go to dashboard</GreenButton>
            </Flex>
          </QuizSection>
        </Main>
        <Sidebar
          isOpen={isOpen}
          closeSidebar= {() => setIsOpen(false)}
        />
      </div>
    </>
  )
}

const handleMainBackground = network => {
  switch (network) {
    case 4:
      return "linear-gradient(116.82deg, #C8E4F8 0%, #EEF6FC 100%, #F4F6F6 100%);";
    case 100:
      return "linear-gradient(116.82deg, #c7eeec 0%, #f4f6f6 100%)";
    default:
      return "linear-gradient(116.82deg, #DDE3E3 0%, #FFFFFF 100%)";
  }
};

const Main = styled.main`
  background: ${({ network }) => handleMainBackground(network)};
  min-height: 100vh;
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

const QuizSection = styled.div`
  margin: 100px auto;
  max-width: 720px;
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