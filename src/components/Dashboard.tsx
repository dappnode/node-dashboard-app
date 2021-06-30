import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Rewards from './Rewards'
import { Inter700, SpaceBetween, WhiteGreenLink } from './Styles'

import Pools from '../assets/Pools.svg'
import Tokens from '../assets/Tokens.svg'
import dnEth from '../assets/dn-eth-logos.svg'
import dn from '../assets/dn-logo.svg'
import external from '../assets/external-link-green.svg'

import { useOnboard } from '../hooks/useOnboard'
import { networkAllowed } from '../lib/web3-utils'
import PoolCard from './PoolCard'

function Dashboard() {

  const { address, network, connect, disconnect, isReady} = useOnboard()

  return (
    <DashboardSection>
        <Inter700>
          <Image alt="tokens" src={Tokens} />
          <span style={{ marginLeft: '10px' }}>My tokens</span>
        </Inter700>
      <PoolsContainer>
        <Rewards />
      </PoolsContainer>
      <br />
      <SpaceBetween>
        <Inter700>
          <Image alt="pools" src={Pools} />
          <span style={{ marginLeft: '10px' }}>Staking Pools</span>
        </Inter700>
        <WhiteGreenLink>
              How does this work? <Image alt="link" src={external} />
        </WhiteGreenLink>
      </SpaceBetween>
      <PoolsContainer>
        <PoolCard
          logo={dnEth}
          name="CAR/xDAI"
          poolAddress="0x561807cd1f2d32f7ef7dadb1515a55d35eba207c"
          owner={address}
        />
        <PoolCard
          name="CAR/HNY"
          logo={dnEth}
          poolAddress="0xb755a9614bfd5eb812b9cc3d00166565f2e72b41"
          owner={address}
        />
        <PoolCard
          name="CAR"
          logo={dn}
          poolAddress="0xf43913aF72af30d6b34782D08C4De3F6a14Ce42e"
          owner={address}
        />
      </PoolsContainer>
    </DashboardSection>
  )
}

const DashboardSection = styled.section`
  height: 100%;
  width: 80%;
  max-width: 940px;
  margin: auto;
  padding: 50px 100px;
`

const PoolsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Dashboard