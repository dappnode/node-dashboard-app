export const DEFAULT_LOCAL_CHAIN = 'private'

export const addressPattern = '(0x)?[0-9a-fA-F]{40}'

export function shortenAddress(address, charsLength = 4) {
	const prefixLength = 2 // "0x"
	if (!address) {
		return ''
	}
	if (address.length < charsLength * 2 + prefixLength) {
		return address
	}
	return `${address.slice(0, charsLength + prefixLength)}…${address.slice(
		-charsLength,
	)}`
}

// TODO: Add DN network id
export function getNetworkType(chainId) {
	const chainIdString = String(chainId)

	if (chainIdString === '1') return 'main'
	if (chainIdString === '3') return 'ropsten'
	if (chainIdString === '4') return 'rinkeby'
	if (chainIdString === '5') return 'goerli'
	if (chainIdString === '42') return 'kovan'
	if (chainIdString === '100') return 'xDAI'
	if (chainIdString === 'localhost') return 'localhost'

	return DEFAULT_LOCAL_CHAIN
}

// TODO: Add DN network id
export function networkAllowed(chainId: number | string): boolean {
	const chainIdString = String(chainId)
	return chainIdString === '4' || chainIdString === '5'
}

export function isMainnet(chainId) {
	const chainIdString = String(chainId)
	return chainIdString === '4'
}

// TODO: Change networtk
export function isDN(chainId) {
	const chainIdString = String(chainId)
	return chainIdString === '5'
}
