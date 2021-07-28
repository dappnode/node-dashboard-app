import config from './configuration'

export const networksParams = {
	1: {
		chainId: '0x1', // A 0x-prefixed hexadecimal string
		chainName: 'Mainnet',
		nativeCurrency: {
			name: 'ETH',
			symbol: 'ETH', // 2-6 characters long
			decimals: 18,
		},
		rpcUrls: ['https://web3.dappnode.net/'],
		blockExplorerUrls: ['https://etherscan.io'],
	},
	100: {
		chainId: '0x64',
		chainName: 'xDAI Chain',
		rpcUrls: ['https://rpc.xdaichain.com/'],
		iconUrls: [
			'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/xdai/info/logo.png',
		],
		nativeCurrency: {
			name: 'xDAI',
			symbol: 'xDAI',
			decimals: 18,
		},
		blockExplorerUrls: ['https://blockscout.com/xdai/mainnet'],
	},
	4: {
		chainId: '0x4',
		chainName: 'Rinkeby',
		rpcUrls: [`https://rinkeby.infura.io/v3/${config.INFURA_API_KEY}/`],
		nativeCurrency: {
			name: 'Rinkeby ETH',
			symbol: 'ETH',
			decimals: 18,
		},
		blockExplorerUrls: ['https://rinkeby.etherscan.io'],
	},
	5: {
		chainId: '0x5',
		chainName: 'Goerli',
		rpcUrls: [`https://goerli.infura.io/v3/${config.INFURA_API_KEY}/`],
		nativeCurrency: {
			name: 'Goerli ETH',
			symbol: 'ETH',
			decimals: 18,
		},
		blockExplorerUrls: ['https://goerli.etherscan.io'],
	},
}
