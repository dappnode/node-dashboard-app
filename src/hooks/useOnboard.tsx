import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ethers } from 'ethers'

import { initOnboard } from '../services/onboard'

type OnboardContextData = {
  connect(): Promise<void>;
  disconnect(): void;
  isReady: boolean;
  address: string;
  network: number;
  provider;
}

type OnboardProviderProps = {
  children: ReactNode
}

const OnboardContext = createContext({} as OnboardContextData)

export function OnboardProvider({ children }: OnboardProviderProps) {
  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState(null)
  const [network, setNetwork] = useState(null)
  const [balance, setBalance] = useState(null)
  const [onboard, setOnboard] = useState(null)
  const [isReady, setIsReady] = useState(false)
  const [wallet, setWallet] = useState<any>({})

  useEffect(() => {
    if (!onboard) {
      const onboard = initOnboard({
        address: setAddress,
        network: setNetwork,
        balance: setBalance,
        wallet: wallet => {
          if (wallet.provider) {
            setWallet(wallet)
            const ethersProvider = new ethers.providers.Web3Provider(wallet.provider)
            setProvider(ethersProvider)
          } else {
            setProvider(null)
            setWallet({})
          }
        }
      })
      setOnboard(onboard)
    }
  }, [])

  async function connect() {
    const selected = await onboard.walletSelect()
    if (!selected) return
    const ready = await onboard.walletCheck()
    if (!ready) return
    window.localStorage.setItem('selectedWallet', wallet.name)
    setIsReady(true)
  }

  function disconnect () {
    setIsReady(false)
    onboard.walletReset()
    window.localStorage.removeItem('selectedWallet')
  }

  return (
    <OnboardContext.Provider value={{ address, network, isReady, provider, connect, disconnect}}>
      { children }
    </OnboardContext.Provider>
  )
}

export function useOnboard() {
  const context = useContext(OnboardContext);

  return context;
}