import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import { useOnboard } from '../hooks/useOnboard'
import config from '../configuration'
import Footer from '../components/Footer'

function Home() {
	const { network } = useOnboard()

	const [, setIsOpen] = useState(false)

	return (
		<>
			<Head>
				<title>DAppNode Dashboard</title>
			</Head>
			<div id='outer-container' style={{ height: '100%' }}>
				<Rectangle />
				{/* @ts-ignore */}
				<Main id='page-wrap' network={network}>
					<Navbar
						title='DAppNode Dashboard'
						nodedrop={false}
						openSidebar={() => setIsOpen(true)}
					/>
					<Dashboard />
					<Footer />
				</Main>
			</div>
		</>
	)
}

const handleMainBackground = network => {
	switch (network) {
		case config.MAINNET_NETWORK_NUMBER:
			return `
        background: url('/assets/eth-background.svg'), linear-gradient(116.82deg, #C8E4F8 0%, #EEF6FC 100%, #F4F6F6 100%);
      `
		case config.XDAI_NETWORK_NUMBER:
			return `
        background: url('/assets/dn-background.svg'), linear-gradient(116.82deg, #c7eeec 0%, #f4f6f6 100%);
      `
		default:
			return 'linear-gradient(116.82deg, #DDE3E3 0%, #FFFFFF 100%)'
	}
}

const Main = styled.main`
	${
		// @ts-ignore
		({ network }) => handleMainBackground(network)
	};
	background-position: bottom right;
	background-repeat: no-repeat;
	min-height: 100vh;
`

const Rectangle = styled.div`
	height: 2px;
	width: 100%;
	background: #54d4cb;
	box-shadow: 0px 0px 12px #54d4cb;
`

export default Home
