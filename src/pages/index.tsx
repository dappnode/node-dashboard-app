import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/SideBar'
import { useOnboard } from '../hooks/useOnboard'

function Home() {

  const { network } = useOnboard();

  console.log(network)

  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <Head>
        <title>DAppNode Dashboard</title>
      </Head>
      <div id="outer-container" style={{ height: '100%' }}>
        <Rectangle />
        <Main id="page-wrap" network={network}>
          <Navbar openSidebar={() => setIsOpen(true)} />
          <div style={{ position: 'absolute', bottom: '0', right: '5%', zIndex: 0 }}>
            { network === 100 && <img alt="Ethereum" src='/assets/dn-background.svg' />}
            { network === 4 && <img alt="DAppNode" src='/assets/eth-background.svg' />}
          </div>
          <Dashboard />
        </Main>
        <Sidebar
          isOpen={isOpen}
          closeSidebar= {() => setIsOpen(false)}
        />
      </div>
    </>
  )
}

const handleMainBackground = network => {
  switch (network) {
    case 4:
      return "linear-gradient(116.82deg, #C8E4F8 0%, #EEF6FC 100%, #F4F6F6 100%);";
    case 100:
      return "linear-gradient(116.82deg, #c7eeec 0%, #f4f6f6 100%)";
    default:
      return "linear-gradient(116.82deg, #DDE3E3 0%, #FFFFFF 100%)";
  }
};

const Main = styled.main`
  background: ${({ network }) => handleMainBackground(network)};
  min-height: 100vh;
`

const Rectangle = styled.div`
  height: 2px;
  width: 100%;
  background: #54D4CB;
  box-shadow: 0px 0px 12px #54D4CB;
`

export default Home