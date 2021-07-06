import Notify from 'bnc-notify'
import Onboard from 'bnc-onboard'

// TODO: change data here. API keys. rpcUrl, dappId key from blocknative
const networkId = 4
const rpcUrl = 'https://localhost:3001'
const apiUrl = process.env.REACT_APP_API_URL
const staging = process.env.REACT_APP_STAGING
const dappId = '87d29f3f-7a35-4b9b-84ef-d61be96ae7e3'

export function initOnboard(subscriptions) {
  return Onboard({
    dappId,
    hideBranding: false,
    networkId,
    apiUrl,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' }
      ]
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
    ]
  })
}

export function initNotify() {
  return Notify({
    dappId,
    networkId,
    apiUrl
  })
}
