import { EnvConfig } from '../types/config'

const config: EnvConfig = {
	MAINNET_NETWORK_NUMBER: 1,
	XDAI_NETWORK_NUMBER: 100,

	MAINNET_CONFIG: {
		TOKEN_ADDRESS: '0xDa007777D86AC6d989cC9f79A73261b3fC5e0DA0',
		WETH_TOKEN_ADDRESS: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
		MERKLE_ADDRESS: '0x87d6180b65Ad76A9443064DCD1596388Fcc3ee2a',
		MERKLE_ADDRESS_2: '0x5fE84e83D7346ebEE9685be4DadF9223d22A1E6F',
		TOKEN_DISTRO_ADDRESS: '0xCfA5B526105Ec86d893F24bC173b1d4166979f54',
		TOKEN_DISTRO_ADDRESS_2: '',

		UNISWAP: {
			POOL_ADDRESS: '0xee3b01b2debd3df95bf24d4aacf8e70373113315',
			LM_ADDRESS: '0x072115DbD5c8b47E971890357d2951d4569F6B27',
		},
		SUSHISWAP: {
			POOL_ADDRESS: '0x60cd8dcc7cce0cca6a3743727ce909b6f715b2d8',
			LM_ADDRESS: '0x89F2e26F20Bf66bBFAc947A3b628b4b4724AaA5c',
		},
		NODE: {
			POOL_ADDRESS: '0xDa007777D86AC6d989cC9f79A73261b3fC5e0DA0',
			LM_ADDRESS: '0x19992b52338B7B49De9679ae018A7027803dB1Aa',
		},
	},

	XDAI_CONFIG: {
		TOKEN_ADDRESS: '0xc60e38C6352875c051B481Cbe79Dd0383AdB7817',
		MERKLE_ADDRESS: '0x91A8ddEe545E479dc2c73d9C0Ac6A017612Ee4cC',
		MERKLE_ADDRESS_2: '0xE8e71B1bec6F7ef4375eB08b1813be54aa71F67c',
		TOKEN_DISTRO_ADDRESS: '0x70B2219F8099f63e4259D9ec331B8EfB433cf3D2',
		TOKEN_DISTRO_ADDRESS_2: '0x7dD9CaBe4E0c3674ed3942d7c551532bbA76BDb1',

		NODE: {
			POOL_ADDRESS: '0xc60e38C6352875c051B481Cbe79Dd0383AdB7817',
			LM_ADDRESS: '0xF66823fdc33B9F4C66dB4C3394FF139872C12f16',
		},
	},
}

export default config
