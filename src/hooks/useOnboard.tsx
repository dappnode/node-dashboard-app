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
	changeWallet(): void
	isReady: boolean
	address: string
	network: number
	provider: Web3Provider
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
		const instance = initOnboard({
			address: setAddress,
			network: setNetwork,
			wallet: w => {
				if (w.provider) {
					setWallet(w)
					const ethersProvider = new ethers.providers.Web3Provider(
						w.provider,
					)
					setProvider(ethersProvider)
					window.localStorage.setItem('selectedWallet', w.name)
				} else {
					setProvider(null)
					setWallet({})
				}
			},
		})

		setOnboard(instance)
	}, [])

	useEffect(() => {
		if (!wallet.provider) return
		const ethersProvider = new ethers.providers.Web3Provider(
			wallet.provider,
		)
		setProvider(ethersProvider)
	}, [network])

	useEffect(() => {
		const previouslySelectedWallet =
			window.localStorage.getItem('selectedWallet')

		if (previouslySelectedWallet && onboard) {
			connect(previouslySelectedWallet)
		}
	}, [onboard])

	async function connect(selectedWallet?: string) {
		const selected = await onboard.walletSelect(selectedWallet)
		if (!selected) return
		const ready = await onboard.walletCheck()
		if (!ready) return
		setIsReady(true)
	}

	function disconnect() {
		setIsReady(false)
		onboard.walletReset()
		window.localStorage.removeItem('selectedWallet')
	}

	function changeWallet() {
		disconnect()
		setTimeout(() => {
			connect()
		}, 100)
	}

	return (
		<OnboardContext.Provider
			value={{
				address,
				network,
				isReady,
				provider,
				connect,
				disconnect,
				changeWallet,
			}}
		>
			{children}
		</OnboardContext.Provider>
	)
}

export function useOnboard() {
	const context = useContext(OnboardContext)

	return context
}
