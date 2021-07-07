import { JsonRpcProvider } from '@ethersproject/providers'
import { ethers, Contract } from 'ethers'
import BigNumber from 'bignumber.js'
import config from '../configuration'
import { abi as UNI_ABI } from '../artifacts/UNI.json'
import { abi as LM_ABI } from '../artifacts/UnipoolVested.json'

const provider = new JsonRpcProvider(config.nodeUrl)
// const xdaiProvider = new JsonRpcProvider( config.xdaiNodeUrl )

export type StakePoolInfo = {
  tokensInPool: string
  tokensInPoolUSD: string
  lpTokens: number
  APR: string
  earned: { amount: number; token: string }
}

export type PoolInfo = {
  name: string
  poolAddress: string
  lmAddress: string
  provideLiquidity: string
  composition: string
  stakePoolInfo: StakePoolInfo
  userStakeInfo: unknown
}

export const uniswapFetchStakePoolInfo = async (
  address: string,
  poolAddress: string,
  lmAddress: string
): Promise<StakePoolInfo> => {
  const poolContract = new Contract(poolAddress, UNI_ABI, provider)
  const lmContract = new Contract(lmAddress, LM_ABI, provider)

  const toBigNumber: (eb: ethers.BigNumber) => BigNumber = (eb) => new BigNumber(eb.toString())

  const [reserves, _token0, _totalSupply, _rewardRate] = await Promise.all([
    poolContract.getReserves(),
    poolContract.token0(),
    lmContract.totalSupply(),
    lmContract.rewardRate(),
  ])
  const [_reserve0, _reserve1] = reserves
  const reserve = toBigNumber(
    _token0.toLowerCase() === config.TOKEN_ADDRESS.toLowerCase()
      ? _reserve0
      : _reserve1
  )

  const lp = toBigNumber(_totalSupply)
    .times(reserve)
    .times(2)
    .div(10 ** 18)

  const APR = _totalSupply.isZero()
    ? '-'
    : toBigNumber(_rewardRate)
        .times('31536000')
        .times('100')
        .div(lp)
        .decimalPlaces(2)
        .toFixed()

  return {
    tokensInPool: _totalSupply as string,
    tokensInPoolUSD: '-',
    lpTokens: 0,
    APR,
    earned: { amount: 0, token: 'DN' },
  }
}
