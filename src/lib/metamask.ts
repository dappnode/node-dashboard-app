declare let window: any

const tokenSymbol = 'NODE'
const tokenDecimals = 18
const tokenImage = 'https://docs.dappnode.io/img/dappnode-logo.png'

const tokenOptions = {
	4: {
		address: '0x3CCF83cF290c186840ECaD76897cfa246f5d6819',
		symbol: tokenSymbol,
		decimals: tokenDecimals,
		image: tokenImage,
	},
	5: {
		address: '0x35bbB49985B2C1494Bec7FD1a48626781AA5ef8c',
		symbol: tokenSymbol,
		decimals: tokenDecimals,
		image: tokenImage,
	},
}

const chainParams = {
	4: { chainId: '0x4' },
	5: { chainId: '0x5' },
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
