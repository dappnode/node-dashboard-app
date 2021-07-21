import { Contract, BigNumber } from 'ethers'
import { bn, ZERO } from './numbers'
import { fetchDnClaimData, fetchEthClaimData } from '../helpers/claim'

import { abi as MERKLE_ABI } from '../artifacts/MerkleDrop.json'
import { MAINNET_CONFIG, XDAI_CONFIG } from '../configuration'
import { mainnetProvider, xdaiProvider } from './networkProvider'

type TypeWave = 1 | 2

export async function getEthClaimableAmount(
	address: string,
	wave: TypeWave,
): Promise<BigNumber> {
	const claimData = await fetchEthClaimData(address, wave)

	const merkleAddress =
		wave === 1
			? MAINNET_CONFIG.MERKLE_ADDRESS
			: MAINNET_CONFIG.MERKLE_ADDRESS_2
	const merkleContract = new Contract(
		merkleAddress,
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
	wave: TypeWave,
): Promise<BigNumber> {
	const claimData = await fetchDnClaimData(address, wave)

	const merkleAddress =
		wave === 1 ? XDAI_CONFIG.MERKLE_ADDRESS : XDAI_CONFIG.MERKLE_ADDRESS_2
	const merkleContract = new Contract(merkleAddress, MERKLE_ABI, xdaiProvider)

	if (!claimData) return ZERO

	const isClaimedResult = await merkleContract.isClaimed(claimData.index)
	const canClaim = Boolean(claimData && isClaimedResult === false)

	// eslint-disable-next-line no-console
	console.log(canClaim)

	if (!canClaim) return ZERO

	const ethAmountBN = bn(claimData.amount)

	return ethAmountBN
}

export async function getXDaiTotalClaimable(
	address: string,
): Promise<BigNumber> {
	const [amount1, amount2] = await Promise.all([
		getXDaiClaimableAmount(address, 1),
		getXDaiClaimableAmount(address, 2),
	])

	return amount1.add(amount2)
}

export async function getEthTotalClaimable(
	address: string,
): Promise<BigNumber> {
	const [amount1, amount2] = await Promise.all([
		getEthClaimableAmount(address, 1),
		getEthClaimableAmount(address, 2),
	])

	return amount1.add(amount2)
}
