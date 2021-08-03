import Onboard from 'bnc-onboard'
import config from '../configuration'

// TODO: change data here. API keys. rpcUrl, dappId key from blocknative
const networkId = config.MAINNET_NETWORK_NUMBER
// const rpcUrl = 'https://localhost:3001'
const apiUrl = process.env.REACT_APP_API_URL
// const staging = process.env.REACT_APP_STAGING

export function initOnboard(subscriptions) {
	return Onboard({
		hideBranding: false,
		networkId,
		apiUrl,
		subscriptions,
		walletSelect: {
			wallets: [{ walletName: 'metamask' }],
		},
		walletCheck: [
			{ checkName: 'derivationPath' },
			{ checkName: 'connect' },
			{ checkName: 'accounts' },
		],
	})
}
