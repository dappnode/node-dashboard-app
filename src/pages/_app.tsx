import React from 'react'
import type { AppProps } from 'next/app'

import '../styles/global.css'
import { OnboardProvider } from '../hooks/useOnboard'

function App({ Component, pageProps }: AppProps) {
  return (
    <OnboardProvider>
      <Component {...pageProps} />
    </OnboardProvider>
  )
}
export default App
