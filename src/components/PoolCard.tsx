import React, { useState } from 'react'
import Image from 'next/image'
import { usePoolCardInfo } from '../hooks/usePoolCardInfo'
import APRDetails from './APRDetails'
import {
  Input,
  Inter600,
  Inter400,
  Inter500Green,
  GreenButton,
  SimpleButton,
} from './Styles'
import {
  Token,
  Earned,
  SpaceBetween,
  Button,
  PoolCardSection,
  ClosePool,
} from './PoolCardStyle'


function PoolCard({ name, poolAddress, owner, logo, hasLiquidityPool = false }) {
  const [poolState, setPoolState] = useState('default')
  const { poolInfo } = usePoolCardInfo()

  return (
    <PoolCardSection>
      {poolState === 'default' && (
        <Principal
          name={name}
          logo={logo}
          stakePoolInfo={poolInfo[name].stakePoolInfo}
          manage={() => setPoolState('manage')}
          deposit={() => setPoolState('deposit')}
          hasLiquidityPool={hasLiquidityPool}
        />
      )}
      {poolState === 'manage' && (
        <Manage
          deposit={() => setPoolState('deposit')}
          withdraw={() => setPoolState('withdraw')}
          close={() => setPoolState('default')}
        />
      )}
      {poolState === 'deposit' && (
        <Deposit close={() => setPoolState('default')} />
      )}
      {poolState === 'withdraw' && (
        <Withdraw close={() => setPoolState('default')} />
      )}
    </PoolCardSection>
  )
}

const Principal = ({ name, stakePoolInfo, manage, deposit, logo, hasLiquidityPool}) => (
  <div>
    <label>Balancer</label>
    <h1>
      <img alt="logo" src={logo} /> {name}
    </h1>
    <SpaceBetween>
      <h2>50% DN 50% ETH</h2>{' '}
      <SimpleButton onClick={deposit}>Add more</SimpleButton>
    </SpaceBetween>
    <SpaceBetween>
      <h2>
        <b>APR:</b>{' '}
        {stakePoolInfo &&
          stakePoolInfo.APR && (
            <div className="pool-info-text">{stakePoolInfo.APR}%</div>
          )}
      </h2>
      <APRDetails />
    </SpaceBetween>
    <SpaceBetween>
      <h2>
        <b>LP token:</b>{' '}
        {stakePoolInfo &&
          stakePoolInfo.APR && (
            <div className="pool-info-text">{stakePoolInfo.APR}%</div>
          )}
      </h2>
      <SimpleButton onClick={manage}>Manage</SimpleButton>
    </SpaceBetween>
    <h2>
      <b>Earned:</b>{' '}
      <div className="pool-info-text">
        <Earned>0</Earned>
        <Token>DN</Token>
      </div>
    </h2>
    <div>
      { false &&
        <>
          <Inter400>You will start earning once your deposit transaction is confirmed.</Inter400>
          <GreenButton className="long">Harvest</GreenButton>
        </>
      }
      { hasLiquidityPool &&
        <Button>Provide liquidity <img src='/assets/external-link-green.svg' /></Button>
      }
      <Button onClick={deposit}>Stake LP tokens</Button>
    </div>
  </div>
)

const Manage = ({ deposit, withdraw, close }) => (
  <>
    <ClosePool onClick={close}>
      <img alt="close" src='/assets/closePool.svg' />
    </ClosePool>
    <div>
      <Inter600>Manage your LP tokens</Inter600>
      <Inter400>
        You currently have <b>56</b> staked Liquidity Provider tokens
      </Inter400>
      <Button onClick={deposit}>Deposit LP tokens</Button>
      <Button onClick={withdraw}>Withdraw LP tokens</Button>
    </div>
  </>
)

const Deposit = ({ close }) => (
  <>
    <ClosePool onClick={close}>
      <img alt="close" src='/assets/closePool.svg' />
    </ClosePool>
    <div>
      <Inter600>Deposit LP tokens</Inter600>
      <Inter400>
        You currently have <b>56</b> staked Liquidity Provider tokens. Deposit more to
        accrue more.
      </Inter400>
      <div>
        <Input type="number" placeholder="Amount" />
        <div>
          <Inter500Green style={{ marginRight: '10px' }}>25%</Inter500Green>
          <Inter500Green style={{ marginRight: '10px' }}>50%</Inter500Green>
          <Inter500Green style={{ marginRight: '10px' }}>75%</Inter500Green>
          <Inter500Green>100%</Inter500Green>
        </div>
      </div>
      <GreenButton className="long" style={{ marginTop: '16px' }}>Deposit LP tokens</GreenButton>
    </div>
  </>
)

const Withdraw = ({ close }) => (
  <>
    <ClosePool onClick={close}>
      <img alt="close" src='/assets/closePool.svg' />
    </ClosePool>
    <div>
      <Inter600>Withdraw LP tokens</Inter600>
      <Inter400>
        You currently have 56 staked Liquidity Provider tokens. Enter the amount
        you’d like to withdraw.
      </Inter400>
      <Input type="number" placeholder="Amount" />
      <GreenButton className="long" style={{ marginTop: '16px' }}>Withdraw LP tokens</GreenButton>
    </div>
  </>
)

export default PoolCard
