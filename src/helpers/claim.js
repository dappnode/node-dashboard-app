import { getAddress } from '@ethersproject/address'

export function isAddress(address) {
  try {
    return getAddress(address)
  } catch {
    return false
  }
}

export async function fetchMerkleResults() {
  const response = await fetch(`/merkle_distributor_result.json`)
  const results = await response.json()

  return results
}

export async function fetchClaimData(address) {
  const { claims } = await fetchMerkleResults()
  const formatted = isAddress(address)

  return claims[formatted]
}


export async function userUnclaimedAmount(address) {
  const userClaimData = await fetchClaimData(address)

  if (!userClaimData) {
    return 0
  }

  return userClaimData.amount
}

async function getClaimableAmount() {
  const signer = await provider.getSigner()
  const tokenContract = new Contract(TOKEN_DISTRO_ADDRESS, TOKEN_DISTRO_ABI, provider)
  const result = await tokenContract.connect(signer).claimableNow(ethers.utils.getAddress(address))
}

async function handleAssign() {
  if (!provider) return

  const signer = await provider.getSigner()
  const claimData = await fetchClaimData(ethers.utils.getAddress(address))
  const merkleContract = new Contract(MERKLE_DISTRIBUTOR_ADDRESS, MERKLE_DISTRIBUTOR_ABI, provider)
  const isClaimedResult = await merkleContract.isClaimed(claimData.index)
  const canClaim = Boolean(claimData && isClaimedResult === false)

  if (!unclaimedAmount || !canClaim || !address || !merkleContract) return

  const args = [claimData.index, address, claimData.amount, claimData.proof]

  const result = await merkleContract.connect(signer).claim(...args)

  console.log(result)

}

async function handleClaim() {
  console.log(provider)
  if (!provider) return
  const signer = await provider.getSigner()
  const tokenContract = new Contract(TOKEN_DISTRO_ADDRESS, TOKEN_DISTRO_ABI, provider)
  const result = await tokenContract.connect(signer).claim()
  console.log(result)
}