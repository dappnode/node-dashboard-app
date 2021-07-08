import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/global.css'
import { OnboardProvider } from '../hooks/useOnboard'

function App({ Component, pageProps }: AppProps) {
	return (
		<OnboardProvider>
			{/* eslint-disable react/jsx-props-no-spreading */}
			<Component {...pageProps} />
		</OnboardProvider>
	)
}
export default App
