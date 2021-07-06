import React, { useContext, useEffect, useState } from 'react'
import { JsonRpcProvider } from '@ethersproject/providers'
import styled from 'styled-components'
import { ethers, Contract } from 'ethers'
import { isMainnet, isDN } from '../lib/web3-utils'
import Seed from '../assets/seed.js'
import Time from '../assets/time.js'
import { BigCurrency, FlexRow, GreenButton } from './Styles'

import { useOnboard } from '../hooks/useOnboard'
import { bn, ZERO } from '../lib/numbers'
import { fetchDnClaimData, fetchEthClaimData } from '../helpers/claim'

const DN_MERKLE_ADDRESS = '0xC3F0C5a44e9256f13360cdAe98B0E72D3481cf71'
const ETH_MERKLE_ADDRESS = '0x52F17267A9a2f429C2c9cccDDD94AEfB1b4109f2'

import { abi as MERKLE_ABI } from '../artifacts/MerkleDrop.json'

function Rewards() {
  const [dnClaimable, setDnClaimable] = useState(ZERO);
  const [ethClaimable, setEthClaimable] = useState(ZERO);

  const { connect, address, network, provider } = useOnboard()

  async function getEthClaimableAmount() {
    if (!address) return

    const provider = new JsonRpcProvider(
      'https://rinkeby.infura.io/v3/dcab448d56f64ffdab03707dc9162080'
    )

    const claimData = await fetchEthClaimData(address)
    const merkleContract = new Contract(ETH_MERKLE_ADDRESS, MERKLE_ABI, provider)
    const isClaimedResult = await merkleContract.isClaimed(claimData.index)
    const canClaim = Boolean(claimData && isClaimedResult === false)
    console.log(canClaim)

    if (!canClaim) return ZERO

    const ethAmountBN = bn(claimData.amount)

    return ethAmountBN
  }

  async function getXDaiClaimableAmount() {
    if (!address) return

    const provider = new JsonRpcProvider(
      'https://goerli.infura.io/v3/dcab448d56f64ffdab03707dc9162080'
    )

    const claimData = await fetchDnClaimData(address)
    const merkleContract = new Contract(DN_MERKLE_ADDRESS, MERKLE_ABI, provider)
    const isClaimedResult = await merkleContract.isClaimed(claimData.index)
    const canClaim = Boolean(claimData && isClaimedResult === false)
    console.log(canClaim)

    if (!canClaim) return ZERO

    const ethAmountBN = bn(claimData.amount)

    return ethAmountBN
  }

  async function updateClaimableAmount() {
    const dnmount = await getXDaiClaimableAmount()
    const ethAmount = await getEthClaimableAmount()
    setDnClaimable(dnmount)
    setEthClaimable(ethAmount)
  }

  useEffect(()=>{

    updateClaimableAmount()

    const interval = setInterval(() => {
      updateClaimableAmount()
     }, 15000)

     return () => clearInterval(interval)
  }, [])

  async function handleDnClaim() {
    if (!provider) return
    const signer = await provider.getSigner()
    const claimData = await fetchDnClaimData(address)
    const merkleContract = new Contract(DN_MERKLE_ADDRESS, MERKLE_ABI, provider)

    const isClaimedResult = await merkleContract.connect(signer).isClaimed(claimData.index)
    const canClaim = Boolean(claimData && isClaimedResult === false)

    if (!canClaim) return

    const args = [claimData.index, address, claimData.amount, claimData.proof]
    const result = await merkleContract.connect(signer).claim(...args)
    console.log(result)
  }

  async function handleEthClaim() {
    if (!provider) return
    const signer = await provider.getSigner()
    const claimData = await fetchEthClaimData(address)
    const merkleContract = new Contract(ETH_MERKLE_ADDRESS, MERKLE_ABI, signer)

    const isClaimedResult = await merkleContract.connect(signer).isClaimed(claimData.index)
    const canClaim = Boolean(claimData && isClaimedResult === false)

    if (!canClaim) return

    const args = [claimData.index, address, claimData.amount, claimData.proof]
    const result = await merkleContract.connect(signer).claim(...args)
    console.log(result)
  }

  return (
    <FlexRow>
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
                  <h1>{parseFloat(ethers.utils.formatEther(ethClaimable)).toFixed(2)}</h1>
                  <h2>NODE</h2>
                </BigCurrency>
                <div>
                  <h3>Claimable</h3>
                </div>
              </div>
            </Inline>
            <BlueButton
              onClick={handleEthClaim}
              disabled={!isMainnet(network) || !ethClaimable.gt(ZERO)}
            >
              Request
            </BlueButton>
          </SpaceBetween>
        </Row>
      </RewardsSection>
      <RewardsSection>
        <SpaceBetween>
          <label className={isDN(network) ? 'green' : 'disabled'}>XDAI</label>
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
                  <h1>{parseFloat(ethers.utils.formatEther(dnClaimable)).toFixed(2)}</h1>
                  <h2>NODE</h2>
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
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  padding: 16px;
  border-radius: 24px;
  border: 1px solid #DDE3E3;
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