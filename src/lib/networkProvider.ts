import { JsonRpcProvider } from '@ethersproject/providers'
import config from '../configuration'

const { MAINNET_CONFIG, NETWORKS_CONFIG, GNOSIS_CONFIG } = config

export const mainnetProvider = new JsonRpcProvider(MAINNET_CONFIG.nodeUrl)
export const gnosisProvider = new JsonRpcProvider(GNOSIS_CONFIG.nodeUrl)

// eslint-disable-next-line no-underscore-dangle
const _networksProviders = {}

// eslint-disable-next-line no-restricted-syntax,guard-for-in
for (const network in NETWORKS_CONFIG) {
	_networksProviders[network] = new JsonRpcProvider(
		NETWORKS_CONFIG[network].nodeUrl,
	)
}

export const networkProviders = _networksProviders
