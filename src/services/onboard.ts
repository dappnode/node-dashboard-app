import Onboard from 'bnc-onboard'
import config from '../configuration'

const networkId = config.MAINNET_NETWORK_NUMBER
const apiUrl = process.env.REACT_APP_API_URL
const dappId = config.BLOCKNATIVE_DAPP_ID

export function initOnboard(subscriptions) {
	return Onboard({
		dappId,
		hideBranding: false,
		networkId,
		apiUrl,
		subscriptions,
		walletSelect: {
			wallets: [{ walletName: 'metamask' },
			{
			  walletName: "walletConnect",
			  rpc: {
				[config.MAINNET_NETWORK_NUMBER]: config.MAINNET_CONFIG.nodeUrl,
				[config.XDAI_NETWORK_NUMBER]: config.XDAI_CONFIG.nodeUrl
			  },
			}],
		},
		walletCheck: [
			{ checkName: 'derivationPath' },
			{ checkName: 'connect' },
			{ checkName: 'accounts' },
		],
	})
}
