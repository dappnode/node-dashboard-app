import React, {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { constants, Contract, ethers } from 'ethers'
import { isAddress } from 'ethers/lib/utils'
import { useOnboard } from './useOnboard'
import config from '../configuration'
import { networkProviders } from '../lib/networkProvider'
import { ZERO } from '../lib/numbers'

const { NETWORKS_CONFIG } = config

type TokenBalanceData = {
	tokenBalance: ethers.BigNumber
	tokenBalanceDN: ethers.BigNumber
	tokenBalanceMainnet: ethers.BigNumber
}

type TokenBalanceProps = {
	children: ReactNode
}

const TokenBalanceContext = createContext<TokenBalanceData>(
	{} as TokenBalanceData,
)
export const TokenBalanceProvider: FC<TokenBalanceProps> = ({ children }) => {
	const [tokenBalance, setTokenBalance] = useState<ethers.BigNumber>(ZERO)
	const [tokenBalanceDN, setTokenBalanceDN] = useState<ethers.BigNumber>(ZERO)
	const [tokenBalanceMainnet, setTokenBalanceMainnet] =
		useState<ethers.BigNumber>(ZERO)

	const { address, network } = useOnboard()
	const { MAINNET_NETWORK_NUMBER, XDAI_NETWORK_NUMBER } = config

	let interval

	const clean = () => {
		if (interval) {
			clearInterval(interval)
			interval = undefined
		}
	}

	function requestContract(networkConfig): Contract | null {
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
			const tokenContract = new Contract(tokenAddress, ERC20ABI, provider)
			return tokenContract
		}
		return null
	}

	function fetchBalanceDN() {
		const networkConfig = NETWORKS_CONFIG[config.XDAI_NETWORK_NUMBER]
		const contract = requestContract(networkConfig)
		if (contract) {
			contract
				.balanceOf(address)
				.then(setTokenBalanceDN)
				.catch(e => console.error('Error on fetching user balance:', e))
		}
	}

	function fetchBalanceMainnet() {
		const networkConfig = NETWORKS_CONFIG[config.MAINNET_NETWORK_NUMBER]
		const contract = requestContract(networkConfig)
		if (contract) {
			contract
				.balanceOf(address)
				.then(setTokenBalanceMainnet)
				.catch(e => console.error('Error on fetching user balance:', e))
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
			const contract = requestContract(networkConfig)
			if (contract) {
				contract
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
		fetchBalanceDN()
		fetchBalanceMainnet()

		interval = setInterval(fetchUserBalance, 15000)

		return clean
	}, [address, network])

	return (
		<TokenBalanceContext.Provider
			value={{ tokenBalance, tokenBalanceDN, tokenBalanceMainnet }}
		>
			{children}
		</TokenBalanceContext.Provider>
	)
}

export const useTokenBalance: () => TokenBalanceData = () =>
	useContext(TokenBalanceContext)
