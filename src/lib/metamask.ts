import { config, MAINNET_CONFIG, XDAI_CONFIG } from '../configuration'

declare let window: any

const tokenSymbol = 'NODE'
const tokenDecimals = 18
const tokenImage = 'https://docs.dappnode.io/img/dappnode-logo.png'

const { MAINNET_NETWORK_NUMBER, XDAI_NETWORK_NUMBER } = config
const tokenOptions = {
	[MAINNET_NETWORK_NUMBER]: {
		address: MAINNET_CONFIG.TOKEN_ADDRESS,
		symbol: tokenSymbol,
		decimals: tokenDecimals,
		image: tokenImage,
	},
	[XDAI_NETWORK_NUMBER]: {
		address: XDAI_CONFIG.TOKEN_ADDRESS,
		symbol: tokenSymbol,
		decimals: tokenDecimals,
		image: tokenImage,
	},
}

const chainParams = {
	[MAINNET_NETWORK_NUMBER]: {
		chainId: `0x${Number(MAINNET_NETWORK_NUMBER).toString(16)}`,
	},
	[XDAI_NETWORK_NUMBER]: {
		chainId: `0x${Number(XDAI_NETWORK_NUMBER).toString(16)}`,
	},
}

export async function addNodeToken(network: number): Promise<void> {
	const { ethereum } = window

	await ethereum.request({
		method: 'wallet_watchAsset',
		params: {
			type: 'ERC20',
			options: tokenOptions[network],
		},
	})
}

export async function addNetwork(network: number): Promise<void> {
	const { ethereum } = window

	await ethereum.request({
		method: 'wallet_addEthereumChain',
		params: [{ ...chainParams[network] }],
	})
}

export async function switchNetwork(network: number): Promise<void> {
	const { ethereum } = window
	const { chainId } = chainParams[network]

	try {
		await ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId }],
		})
	} catch (switchError) {
		// This error code indicates that the chain has not been added to MetaMask.
		if (switchError.code === 4902) {
			addNetwork(network)
		}
	}
}
