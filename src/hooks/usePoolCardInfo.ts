import {useCallback, useEffect, useState} from 'react'
import { useOnboard } from './useOnboard'
import {PoolInfo, StakePoolInfo, uniswapFetchStakePoolInfo} from "../services/pool";



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

  const [poolsInfo, setPoolsInfo] = useState<{[index: string]: PoolInfo}>({
    'NODE/xDAI': {
      name: 'Uniswap',
      poolAddress: '0x9e223F8F1877C23096a30b1b25b52D311b7116D6',
      lmAddress: '0x92944a127F16F24fDF4ee590a63F12d9B7C2476A',
      provideLiquidity: 'https://app.uniswap.org/#/add/v2/ETH/0xa2444c16F93d7319B2D2667140B41F8f2541A80e',
      composition: '50% NODE, 50% ETH',
      stakePoolInfo: {
        tokensInPool: '-',
        tokensInPoolUSD: '-',
        lpTokens: 0,
        APR: '-',
        earned: {amount: 0, token: 'DN'}
      },
      userStakeInfo: null,
    },
    'NODE/HNY': {
      name: 'Balancer',
      poolAddress: '',
      lmAddress: '',
      provideLiquidity: '',
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
      poolAddress: '',
      lmAddress: '',
      provideLiquidity: '',
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


  useEffect(() => {
      const poolInfo = poolsInfo['NODE/xDAI'];
      uniswapFetchStakePoolInfo(address, poolInfo.poolAddress, poolInfo.lmAddress).then(stakePoolInfo => {

        setPoolsInfo({
          ...poolsInfo,
          'NODE/xDAI': {
            ...poolInfo,
            stakePoolInfo,
          }
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return {
    poolsInfo,
    contracts,
  }
}
