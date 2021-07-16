export const config = {
	TOKEN_NAME: 'NODE',
	ETH_USDT_ORACLE: 'eth-usd.data.eth',

	MAINNET_NETWORK_NUMBER: 4,
	XDAI_NETWORK_NUMBER: 5,
}

export const MAINNET_CONFIG = {
	TOKEN_ADDRESS: '0x39A2fad92db0ba608869115eB2E6d26eF16CABC5',
	WETH_TOKEN_ADDRESS: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
	MERKLE_ADDRESS: '0x0a95d45f31B04ef68DEF12A1D1592C8b368FF4DA',
	TOKEN_DISTRO_ADDRESS: '0x4827C4804098d80b386C812962FdA5613274B7b1',

	nodeUrl: process.env.NEXT_PUBLIC_NODE_URL,

	UNISWAP: {
		POOL_ADDRESS: '0x891510ec2f626984da59c3c1dbf7d823dd74324d',
		LM_ADDRESS: '0x2c46430D4dA467Cf247E49A33ECd27DE1e16F451',
	},
	SUSHISWAP: {
		POOL_ADDRESS: '0x53c0ffb5b5896119e797db784cd821c5e4f4d44c',
		LM_ADDRESS: '0x3279F4e11445cbf99986AE56B7B807846fAbA7DE',
	},
	NODE: {
		POOL_ADDRESS: '0x39A2fad92db0ba608869115eB2E6d26eF16CABC5',
		LM_ADDRESS: '0x214A3391a8aDC489DDA12cD5C3186549Bedad547',
	},
}

export const XDAI_CONFIG = {
	TOKEN_ADDRESS: '0xeA4c1838D4aDCe957C59E2AF646e6a566e4bffe0',
	MERKLE_ADDRESS: '0x8fE791Bc6b4Dd96757d78d2F2B5B1a92a468e39f',
	TOKEN_DISTRO_ADDRESS: '0x51C3Dd214bf8a569b073A90D4cc3aD0bFc3F8c37',

	nodeUrl: process.env.NEXT_PUBLIC_XDAI_NODE_URL,

	NODE: {
		POOL_ADDRESS: '0xeA4c1838D4aDCe957C59E2AF646e6a566e4bffe0',
		LM_ADDRESS: '0x8EBd3f4Ba18cBae89A1f26faB657fC1a25504A9C',
	},
}

export const NETWORKS_CONFIG = {
	[config.MAINNET_NETWORK_NUMBER]: MAINNET_CONFIG,
	[config.XDAI_NETWORK_NUMBER]: XDAI_CONFIG,
}
