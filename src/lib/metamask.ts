import config from '../configuration'
import { networksParams } from '../constants'

const { MAINNET_CONFIG, GNOSIS_CONFIG } = config
declare let window: any

const tokenSymbol = 'NODE'
const tokenDecimals = 18
const tokenImage = 'https://docs.dappnode.io/img/dappnode-logo.png'

const { MAINNET_NETWORK_NUMBER, GNOSIS_NETWORK_NUMBER } = config
const tokenOptions = {
	[MAINNET_NETWORK_NUMBER]: {
		address: MAINNET_CONFIG.TOKEN_ADDRESS,
		symbol: tokenSymbol,
		decimals: tokenDecimals,
		image: tokenImage,
	},
	[GNOSIS_NETWORK_NUMBER]: {
		address: GNOSIS_CONFIG.TOKEN_ADDRESS,
		symbol: tokenSymbol,
		decimals: tokenDecimals,
		image: tokenImage,
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
		params: [{ ...networksParams[network] }],
	})
}

export async function switchNetwork(network: number): Promise<void> {
	const { ethereum } = window
	const { chainId } = networksParams[network]

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
