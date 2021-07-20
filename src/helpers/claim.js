import { getAddress } from '@ethersproject/address'

export function isAddress(address) {
	try {
		return getAddress(address)
	} catch {
		return false
	}
}

export async function fetchDnMerkleResults() {
	const response = await fetch(`/merkle_distributor_result_xdai_second.json`)
	const results = await response.json()

	return results
}

export async function fetchEthMerkleResults() {
	const response = await fetch(`/merkle_distributor_result_mainnet_second.json`)
	const results = await response.json()

	return results
}

export async function fetchDnClaimData(address) {
	try {
		const { claims } = await fetchDnMerkleResults()
		const formatted = isAddress(address)

		return claims[formatted]
	} catch (e) {
		console.error(e)
		return null
	}
}

export async function fetchEthClaimData(address) {
	try {
		const { claims } = await fetchEthMerkleResults()
		const formatted = isAddress(address)

		return claims[formatted]
	} catch (e) {
		console.error(e)
		return null
	}
}
