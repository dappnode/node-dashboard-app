import { getAddress } from '@ethersproject/address';

const DN_MERKLE_ADDRESS = '0xC3F0C5a44e9256f13360cdAe98B0E72D3481cf71'
const ETH_MERKLE_ADDRESS = '0x52F17267A9a2f429C2c9cccDDD94AEfB1b4109f2'

export function isAddress(address) {
  try {
    return getAddress(address)
  } catch {
    return false
  }
}

export async function fetchDnMerkleResults() {
  const response = await fetch(`/merkle_distributor_result_xdai.json`)
  const results = await response.json()

  return results
}

export async function fetchEthMerkleResults() {
  const response = await fetch(`/merkle_distributor_result_mainnet.json`)
  const results = await response.json()

  return results
}

export async function fetchDnClaimData(address) {
  const { claims } = await fetchDnMerkleResults()
  const formatted = isAddress(address)
  return claims[formatted]
}

export async function fetchEthClaimData(address) {
  const { claims } = await fetchEthMerkleResults()
  const formatted = isAddress(address)

  return claims[formatted]
}
