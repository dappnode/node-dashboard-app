import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { networkAllowed, isMainnet, isDN } from '../lib/web3-utils'
import Seed from '../assets/seed.js'
import Time from '../assets/time.js'
import { BigCurrency, GreenButton } from './Styles'

import { useOnboard } from '../hooks/useOnboard'

function Rewards() {
  const { connect, address, network, isReady, provider } = useOnboard()

  if (!isReady) {
    return (
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
  if (!networkAllowed(network)) {
    return (
      <WarnSection>
        <WarnMessage>Please connect to the right network</WarnMessage>
      </WarnSection>
    )
  }

  return (
    <>
      <RewardsSection disabled={!isMainnet(network)}>
        <SpaceBetween>
          <label className={isMainnet(network) ? 'blue' : 'disabled'}>
            ETH
          </label>
          {!isMainnet(network) && (
            <p>
              <b>Connect to this network</b> to claim your tokens.{' '}
            </p>
          )}
        </SpaceBetween>
        <br />
        <Row>
          <SpaceBetween>
            <Inline>
              <Seed
                fillColor={isMainnet(network) ? '#EEF6FC' : '#F4F6F6'}
                strokeColor={isMainnet(network) ? '#0D91F0' : '#819896'}
              />
              <div>
                <BigCurrency>
                  <h1>0</h1>
                  <h2>DN</h2>
                </BigCurrency>
                <div>
                  <h3>Claimable</h3>
                </div>
              </div>
            </Inline>
            <BlueButton disabled={!isMainnet(network)}>Claim</BlueButton>
          </SpaceBetween>
        </Row>
        <Row>
          <SpaceBetween>
            <Inline>
              <Time
                fillColor={isMainnet(network) ? '#EEF6FC' : '#F4F6F6'}
                strokeColor={isMainnet(network) ? '#0D91F0' : '#819896'}
              />
              <div>
                <BigCurrency>
                  <h1>0</h1>
                  <h2>DN</h2>
                </BigCurrency>
                <div>
                  <h3>Claimable</h3>
                </div>
              </div>
            </Inline>
            <BlueButton disabled={!isMainnet(network)}>Assign</BlueButton>
          </SpaceBetween>
        </Row>
      </RewardsSection>
      <RewardsSection>
        <SpaceBetween>
          <label className={isDN(network) ? 'green' : 'disabled'}>RBN</label>
          {!isDN(network) && (
            <p>
              <b>Connect to this network</b> to claim your tokens.{' '}
            </p>
          )}
        </SpaceBetween>
        <br />
        <Row disabled={!isDN(network)}>
          <SpaceBetween>
            <Inline>
              <Seed
                fillColor={isDN(network) ? '#EEFCFB' : '#F4F6F6'}
                strokeColor={isDN(network) ? '#248F8B' : '#819896'}
              />
              <div>
                <BigCurrency>
                  <h1>0</h1>
                  <h2>DN</h2>
                </BigCurrency>
                <div>
                  <h3>Claimable</h3>
                </div>
              </div>
            </Inline>

            <GreenButton
              disabled={!isDN(network)}
            >
              Claim
            </GreenButton>
          </SpaceBetween>
        </Row>
        <Row>
          <SpaceBetween>
            <Inline>
              <Time
                fillColor={isDN(network) ? '#EEFCFB' : '#F4F6F6'}
                strokeColor={isDN(network) ? '#248F8B' : '#819896'}
              />

              <div>
                <BigCurrency>
                  <h1>0</h1>
                  <h2>DN</h2>
                </BigCurrency>
                <div>
                  <h3>Claimable</h3>
                </div>
              </div>
            </Inline>
            <GreenButton disabled={!isDN(network)}>
              Claim
            </GreenButton>
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
  width: 100%;
  padding: 16px;
  box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
    0px 2px 8px rgba(8, 43, 41, 0.06);
  border-radius: 16px;
  flex-grow: 1;
  margin: 0 10px;
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