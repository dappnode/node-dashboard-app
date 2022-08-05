interface PoolConfig {
	POOL_ADDRESS: string
	LM_ADDRESS: string
}
interface NetworkConfig {
	TOKEN_ADDRESS: string
	WETH_TOKEN_ADDRESS?: string
	MERKLE_ADDRESS: string
	MERKLE_ADDRESS_2: string
	TOKEN_DISTRO_ADDRESS: string
	TOKEN_DISTRO_ADDRESS_2: string
	UNISWAP?: PoolConfig
	SUSHISWAP?: PoolConfig
	NODE?: PoolConfig
	nodeUrl?: string
}
export interface EnvConfig {
	MAINNET_NETWORK_NUMBER: number
	GNOSIS_NETWORK_NUMBER: number
	MAINNET_CONFIG: NetworkConfig
	GNOSIS_CONFIG: NetworkConfig
}

export interface GlobalConfig extends EnvConfig {
	TOKEN_NAME: string
	ETH_USDT_ORACLE: string
	NETWORKS_CONFIG: {
		[key: number]: NetworkConfig
	}
	INFURA_API_KEY: string
	BLOCKNATIVE_DAPP_ID: string
}
