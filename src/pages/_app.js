import React from 'react'

import './index.css';
import './App.css';

function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}

export default App
