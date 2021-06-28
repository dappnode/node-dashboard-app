import React from 'react'
import styled from 'styled-components'
import PoolCard from './PoolCard'
import Rewards from './Rewards'
import { networkAllowed } from '../lib/web3-utils'
import { Inter700 } from './Styles.js'

function Dashboard({ provider, address, network, wallet, onboard }) {
  return (
    <DashboardSection>
      <Inter700>
        <Image alt="tokens" src='../assets/Tokens.svg' />
        My tokens
      </Inter700>
      <PoolsContainer>
        <Rewards wallet={wallet} network={network} onboard={onboard} />
      </PoolsContainer>
      <br />
      <Inter700>
        <Image alt="pools" src='../assets/Pools.svg' />
        Staking Pools
      </Inter700>
      <PoolsContainer>
        {provider &&
          address &&
          networkAllowed(network) && (
            <>
              <PoolCard
                provider={provider}
                logo='../assets/dn-eth-logos.svg'
                name="CAR/xDAI"
                poolAddress="0x561807cd1f2d32f7ef7dadb1515a55d35eba207c"
                owner={address}
              />
              <PoolCard
                provider={provider}
                name="CAR/HNY"
                logo='../assets/dn-eth-logos.svg'
                poolAddress="0xb755a9614bfd5eb812b9cc3d00166565f2e72b41"
                owner={address}
              />
              <PoolCard
                provider={provider}
                name="CAR"
                logo='../assets/dn-logo.svg'
                poolAddress="0xf43913aF72af30d6b34782D08C4De3F6a14Ce42e"
                owner={address}
              />
            </>
          )}
      </PoolsContainer>
    </DashboardSection>
  )
}

const DashboardSection = styled.section`
  height: 100%;
  width: 80%;
  max-width: 940px;
  margin: auto;
  padding: 100px;
`

const PoolsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default Dashboard
