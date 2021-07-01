import React from 'react'
import styled from 'styled-components'
import ConnectionInfo from './ConnectionInfo'

import { Inter700 } from './Styles'

function Navbar({openSidebar}) {

  return (
    <NavbarSection>
      <Container>
        <div onClick={openSidebar}>
          <img src='/assets/mini-logo.svg' alt="logo" />
          <Inter700>DAppNode Dashboard</Inter700>
        </div>
        <div>
            <ConnectionInfo />
        </div>
      </Container>
    </NavbarSection>
  )
}

const ConnectedLine = styled.div`
  background: #54d4cb;
  box-shadow: 0px 0px 12px #54d4cb;
  width: 100%;
  height: 4px;
`

const NavbarSection = styled.section`
  background-color: transparent;
  height: 72px;
  text-align: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
`

const Container = styled.div`
  width: 95%;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  h1 {
    font-size: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.2px;
    color: #35403f;
    img {
      padding-right: 32px;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    cursor: pointer;
    p {
      margin: 0 15px;
    }
  }
  @media only screen and (max-width: 444px) {
    img {
      width: 190px;
    }
  }
`

export default Navbar
