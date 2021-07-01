import { useState } from 'react'
import { useOnboard } from './useOnboard'

export function usePoolCardInfo() {
  const { provider, address } = useOnboard()
  let owner = address

  const poolAddress = {
    'NODE/xDAI': '0x561807cd1f2d32f7ef7dadb1515a55d35eba207c',
    'NODE/HNY': '0xb755a9614bfd5eb812b9cc3d00166565f2e72b41',
    'NODE': '0xf43913aF72af30d6b34782D08C4De3F6a14Ce42e',
  }

  const [contracts, setContracts] = useState({
    'NODE/xDAI': {},
    'NODE/HNY': {},
    'NODE': {},
  })

  const [poolInfo, setPoolInfo] = useState({
    'NODE/xDAI': {
      name: 'Uniswap',
      composition: '50% NODE, 50% ETH',
      stakePoolInfo: {
        tokensInPool: '1532 DN, 0.23 ETH',
        tokensInPoolUSD: '(1400.65 USD)',
        lpTokens: 56,
        APR: '148.55%',
        earned: {amount: 900, token: 'DN'}
      },
      userStakeInfo: null,
    },
    'NODE/HNY': {
      name: 'Balancer',
      composition: '50% NODE, 50% ETH',
      stakePoolInfo: {
        tokensInPool: '1532 DN, 0.23 ETH',
        tokensInPoolUSD: '(1400.65 USD)',
        lpTokens: 56,
        APR: '148.55%',
        earned: {amount: 900, token: 'DN'}
      },
      userStakeInfo: null,
    },
    'NODE': {
      name: 'NODE Staking',
      composition: '100% NODE',
      stakePoolInfo: {
        tokensInPool: '1532 DN, 0.23 ETH',
        tokensInPoolUSD: '(1400.65 USD)',
        lpTokens: 56,
        APR: '148.55%',
        earned: {amount: 900, token: 'DN'}
      },
      userStakeInfo: null,
    },
  })

  return {
    poolInfo,
    contracts,
  }
}
