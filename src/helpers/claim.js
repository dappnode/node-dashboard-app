import { getAddress } from '@ethersproject/address'

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
