import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react'
import { ethers } from 'ethers'

import { Web3Provider } from '@ethersproject/providers'
import { initOnboard } from '../services/onboard'

type OnboardContextData = {
	connect(): Promise<void>
	disconnect(): void
	isReady: boolean
	address: string
	network: number
	provider
}

type OnboardProviderProps = {
	children: ReactNode
}

const OnboardContext = createContext({} as OnboardContextData)

export function OnboardProvider({ children }: OnboardProviderProps) {
	const [provider, setProvider] = useState<Web3Provider | null>(null)
	const [address, setAddress] = useState<string>('')
	const [network, setNetwork] = useState<number>(0)
	// const [balance, setBalance] = useState(null)
	const [onboard, setOnboard] = useState<any>(null)
	const [isReady, setIsReady] = useState(false)
	const [wallet, setWallet] = useState<any>({})

	useEffect(() => {
		if (!onboard) {
			const instance = initOnboard({
				address: setAddress,
				network: setNetwork,
				// balance: setBalance,
				wallet: w => {
					if (w.provider) {
						setWallet(w)
						const ethersProvider =
							new ethers.providers.Web3Provider(w.provider)
						setProvider(ethersProvider)
					} else {
						setProvider(null)
						setWallet({})
					}
				},
			})
			setOnboard(instance)
		}
	}, [onboard])

	useEffect(() => {
		if (!wallet.provider) return
		const ethersProvider = new ethers.providers.Web3Provider(
			wallet.provider,
		)
		setProvider(ethersProvider)
	}, [network, wallet])

	async function connect() {
		const selected = await onboard.walletSelect()
		if (!selected) return
		const ready = await onboard.walletCheck()
		if (!ready) return
		window.localStorage.setItem('selectedWallet', wallet.name)
		setIsReady(true)
	}

	function disconnect() {
		setIsReady(false)
		onboard.walletReset()
		window.localStorage.removeItem('selectedWallet')
	}

	return (
		<OnboardContext.Provider
			value={{ address, network, isReady, provider, connect, disconnect }}
		>
			{children}
		</OnboardContext.Provider>
	)
}

export function useOnboard() {
	const context = useContext(OnboardContext)

	return context
}
