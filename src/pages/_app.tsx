import React, { useState } from 'react'
import type { AppProps } from 'next/app'
import { BigNumber, constants } from 'ethers'

import '../styles/global.css'
import Toaster from '../components/Toaster'
import { OnboardProvider } from '../hooks/useOnboard'
import { TokenBalanceProvider } from '../hooks/useTokenBalance'
import AppContext, { AppContextInterface } from '../hooks/AppContext'

function App({ Component, pageProps }: AppProps) {
	const appContext: AppContextInterface = {
		uniswap: null,
		sushiswap: null,
		streamMainnet: null,
		streamDN: null,
		ethLocked: constants.Zero,
		xDaiLocked: constants.Zero,
		ethClaimable: constants.Zero,
		xDaiClaimable: constants.Zero,
		uniswapLPNODE: constants.Zero,
		sushiswapLPNODE: constants.Zero,
	}

	return (
		<AppContext.Provider value={appContext}>
			<OnboardProvider>
				<TokenBalanceProvider>
					{/* eslint-disable react/jsx-props-no-spreading */}
					<Toaster />
					<Component {...pageProps} />
				</TokenBalanceProvider>
			</OnboardProvider>
		</AppContext.Provider>
	)
}
export default App
