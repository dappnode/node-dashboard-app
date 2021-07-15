import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/global.css'
import { OnboardProvider } from '../hooks/useOnboard'
import { TokenBalanceProvider } from '../hooks/useTokenBalance'

function App({ Component, pageProps }: AppProps) {
	return (
		<OnboardProvider>
			<TokenBalanceProvider>
				{/* eslint-disable react/jsx-props-no-spreading */}
				<Component {...pageProps} />
			</TokenBalanceProvider>
		</OnboardProvider>
	)
}
export default App
