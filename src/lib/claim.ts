import { Contract, BigNumber } from 'ethers'
import { bn, ZERO } from './numbers'
import { fetchDnClaimData, fetchEthClaimData } from '../helpers/claim'

import { abi as MERKLE_ABI } from '../artifacts/MerkleDrop.json'
import { MAINNET_CONFIG, XDAI_CONFIG } from '../configuration'
import { mainnetProvider, xdaiProvider } from './networkProvider'

export async function getEthClaimableAmount(
	address: string,
): Promise<BigNumber> {
	const claimData = await fetchEthClaimData(address)
	const merkleContract = new Contract(
		MAINNET_CONFIG.MERKLE_ADDRESS,
		MERKLE_ABI,
		mainnetProvider,
	)

	if (!claimData) return ZERO

	const isClaimedResult = await merkleContract.isClaimed(claimData.index)
	const canClaim = Boolean(claimData && isClaimedResult === false)

	// eslint-disable-next-line no-console
	console.log(canClaim)

	if (!canClaim) return ZERO

	const ethAmountBN = bn(claimData.amount)

	return ethAmountBN
}

export async function getXDaiClaimableAmount(
	address: string,
): Promise<BigNumber> {
	const claimData = await fetchDnClaimData(address)
	const merkleContract = new Contract(
		XDAI_CONFIG.MERKLE_ADDRESS,
		MERKLE_ABI,
		xdaiProvider,
	)

	if (!claimData) return ZERO

	const isClaimedResult = await merkleContract.isClaimed(claimData.index)
	const canClaim = Boolean(claimData && isClaimedResult === false)

	// eslint-disable-next-line no-console
	console.log(canClaim)

	if (!canClaim) return ZERO

	const ethAmountBN = bn(claimData.amount)

	return ethAmountBN
}
