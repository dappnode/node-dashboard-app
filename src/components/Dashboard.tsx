import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Rewards from './Rewards'
import { Inter700, SpaceBetween, WhiteGreenLink } from './Styles'

import { useOnboard } from '../hooks/useOnboard'
import { networkAllowed } from '../lib/web3-utils'
import PoolCard from './PoolCard'

function Dashboard() {

  const { address, network, connect, disconnect, isReady} = useOnboard()

  return (
    <DashboardSection>
        <Inter700>
          <img alt="tokens" src='/assets/Tokens.svg' />
          <span style={{ marginLeft: '10px' }}>My tokens</span>
        </Inter700>
      <PoolsContainer>
        <Rewards />
      </PoolsContainer>
      <br />
      <SpaceBetween>
        <Inter700>
          <img alt="pools" src='/assets/Pools.svg' />
          <span style={{ marginLeft: '10px' }}>Staking Pools</span>
        </Inter700>
        <div></div>
        <WhiteGreenLink>
              How does this work? <img alt="link" src='/assets/external-link-green.svg' />
        </WhiteGreenLink>
      </SpaceBetween>
      <PoolsContainer>
        <PoolCard
          logo='/assets/dn-eth-logos.svg'
          name="NODE/xDAI"
          poolAddress="0x561807cd1f2d32f7ef7dadb1515a55d35eba207c"
          owner={address}
          hasLiquidityPool
        />
        <PoolCard
          name="NODE/HNY"
          logo='/assets/dn-eth-logos.svg'
          poolAddress="0xb755a9614bfd5eb812b9cc3d00166565f2e72b41"
          owner={address}
          hasLiquidityPool
        />
        <PoolCard
          name="NODE"
          logo='/assets/dn-logo.svg'
          poolAddress="0xf43913aF72af30d6b34782D08C4De3F6a14Ce42e"
          owner={address}
        />
        <PoolCard
          name="NODE"
          logo='/assets/dn-logo.svg'
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
  max-width: 1140px;
  margin: auto;
  padding: 50px 100px;
`

const PoolsContainer = styled.div`
  display: flex;
`

export default Dashboard