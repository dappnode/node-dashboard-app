import React, { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'

import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import Sidebar from '../components/SideBar'

function Home() {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Head>
        <title>DAppNode Dashboard</title>
      </Head>
      <div id="outer-container" style={{ height: '100%' }}>
        <Sidebar
          isOpen={isOpen}
          closeSidebar= {() => setIsOpen(false)}
        />
        <Main id="page-wrap">
          <Navbar openSidebar={() => setIsOpen(true)} />
          <Dashboard />
        </Main>
      </div>
    </>
  )
}

const Main = styled.main`
  background: linear-gradient(116.82deg, #c7eeec 0%, #f4f6f6 100%);
  min-height: 100vh;
`

export default Home