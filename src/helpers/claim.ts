import { getAddress } from '@ethersproject/address'
import { constants } from 'ethers'

type TypeWave = 1 | 2

export function formatAddress(address: string): string {
	try {
		return getAddress(address)
	} catch {
		return constants.AddressZero
	}
}

export async function fetchDnMerkleResults(wave: TypeWave): Promise<any> {
	const file =
		wave === 1
			? `/merkle_distributor_result_xdai.json`
			: `merkle_distributor_result_xdai_second.json`

	const response = await fetch(file)
	const results = await response.json()

	return results
}

export async function fetchEthMerkleResults(wave: TypeWave): Promise<any> {
	const file =
		wave === 1
			? `/merkle_distributor_result_mainnet.json`
			: `merkle_distributor_result_mainnet_second.json`

	const response = await fetch(file)
	const results = await response.json()

	return results
}

export async function fetchDnClaimData(
	address: string,
	wave: TypeWave,
): Promise<any> {
	try {
		const { claims } = await fetchDnMerkleResults(wave)
		const formatted = formatAddress(address)

		return claims[formatted]
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e)
		return null
	}
}

export async function fetchEthClaimData(
	address: string,
	wave: TypeWave,
): Promise<any> {
	try {
		const { claims } = await fetchEthMerkleResults(wave)
		const formatted = formatAddress(address)

		return claims[formatted]
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e)
		return null
	}
}
