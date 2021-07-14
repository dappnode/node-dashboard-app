export const config = {
	TOKEN_NAME: 'NODE',
	ETH_USDT_ORACLE: 'eth-usd.data.eth',

	MAINNET_NETWORK_NUMBER: 4,
	XDAI_NETWORK_NUMBER: 5,
}

export const MAINNET_CONFIG = {
	TOKEN_ADDRESS: '0x3CCF83cF290c186840ECaD76897cfa246f5d6819',
	WETH_TOKEN_ADDRESS: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
	MERKLE_ADDRESS: '0xf2472cD3A76DE2d6F67d1E4cB7827a613D0DBAaf',
	TOKEN_DISTRO_ADDRESS: '0x4A9305Db805e8f4465ce48a367005a6dBb5347CB',

	nodeUrl: 'https://rinkeby2.giveth.io',

	UNISWAP: {
		POOL_ADDRESS: '0x415Bd1074305Ac16d3dA4f6F1fCaC7Dd9D9b61a6',
		LM_ADDRESS: '0x58818559e965cF173785ACaD69230FB017E40eF8',
	},
	SUSHISWAP: {
		POOL_ADDRESS: '0x9D70c59ea3c50810D6f3E87f9Ad9Efa3BFB07B8B',
		LM_ADDRESS: '0xD5063440438682CCe9d3eE2D52C2E4Ac7cC28C32',
	},
	NODE: {
		POOL_ADDRESS: '0x3CCF83cF290c186840ECaD76897cfa246f5d6819',
		LM_ADDRESS: '0x379D1c4c4E13DE05865C13862183AEd7baeCdD78',
	},
}

export const XDAI_CONFIG = {
	TOKEN_ADDRESS: '0x35bbB49985B2C1494Bec7FD1a48626781AA5ef8c',
	MERKLE_ADDRESS: '0x9cf0b63Bf9F8790354D103DaC01Df8A12E048eDf',
	TOKEN_DISTRO_ADDRESS: '0xBaED096Ec0B98Bc221A431DFdCaa72A069F65762',

	nodeUrl: 'https://goerli-geth.64c00d9aa3d08710.dyndns.dappnode.io/',

	NODE: {
		POOL_ADDRESS: '0x35bbB49985B2C1494Bec7FD1a48626781AA5ef8c',
		LM_ADDRESS: '0xe9Bb6B29B4530C5A76EBd6239925c8f99011d358',
	},
}

export const NETWORKS_CONFIG = {
	4: MAINNET_CONFIG,
	5: XDAI_CONFIG,
}
