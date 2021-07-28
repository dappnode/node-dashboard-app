import React, {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { Contract, ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import { useOnboard } from './useOnboard'
import config from '../configuration'
import { networkProviders } from '../lib/networkProvider'
import { ZERO } from '../lib/numbers'

const { NETWORKS_CONFIG } = config

type TokenBalanceData = {
	tokenBalance: ethers.BigNumber
}

type TokenBalanceProps = {
	children: ReactNode
}

const TokenBalanceContext = createContext<TokenBalanceData>(
	{} as TokenBalanceData,
)
export const TokenBalanceProvider: FC<TokenBalanceProps> = ({ children }) => {
	const [tokenBalance, setTokenBalance] = useState<ethers.BigNumber>(ZERO)

	const { address, network } = useOnboard()
	const { MAINNET_NETWORK_NUMBER, XDAI_NETWORK_NUMBER } = config

	let interval

	const clean = () => {
		if (interval) {
			clearInterval(interval)
			interval = undefined
		}
	}
	useEffect(() => {
		function fetchUserBalance() {
			if (
				![MAINNET_NETWORK_NUMBER, XDAI_NETWORK_NUMBER].includes(
					network,
				) ||
				!isAddress(address)
			) {
				setTokenBalance(ZERO)
				return
			}

			const networkConfig = NETWORKS_CONFIG[network]

			if (networkConfig) {
				const tokenAddress = networkConfig.TOKEN_ADDRESS
				const provider = networkProviders[network]

				const ERC20ABI = [
					// read balanceOf
					{
						constant: true,
						inputs: [{ name: '_owner', type: 'address' }],
						name: 'balanceOf',
						outputs: [{ name: 'balance', type: 'uint256' }],
						type: 'function',
					},
				]
				const tokenContract = new Contract(
					tokenAddress,
					ERC20ABI,
					provider,
				)
				tokenContract
					.balanceOf(address)
					.then(setTokenBalance)
					.catch(e =>
						console.error('Error on fetching user balance:', e),
					)
			} else {
				setTokenBalance(ZERO)
			}
		}

		fetchUserBalance()

		interval = setInterval(fetchUserBalance, 15000)

		return clean
	}, [address, network])

	return (
		<TokenBalanceContext.Provider value={{ tokenBalance }}>
			{children}
		</TokenBalanceContext.Provider>
	)
}

export const useTokenBalance: () => TokenBalanceData = () =>
	useContext(TokenBalanceContext)
