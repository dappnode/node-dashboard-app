import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import ConnectionInfo from './ConnectionInfo'

import { Inter700, GreenButton } from './Styles'

function Navbar({ openSidebar, nodedrop, title }) {
	return (
		<NavbarSection>
			<Container>
				<div onClick={openSidebar} aria-hidden='true'>
					<img src='/assets/mini-logo.svg' alt='logo' />
					<Inter700>{title}</Inter700>
					{nodedrop ? (
						<Link href='/'>
							<GreenButton>Go to dashboard!</GreenButton>
						</Link>
					) : (
						<Link href='/nodedrop'>
							<GreenButton>Claim your airdrop!</GreenButton>
						</Link>
					)}
				</div>
				<div>
					<ConnectionInfo nodedrop={nodedrop} />
				</div>
			</Container>
		</NavbarSection>
	)
}

// eslint-disable-next-line no-unused-vars
const ConnectedLine = styled.div`
	background: #54d4cb;
	box-shadow: 0px 0px 12px #54d4cb;
	width: 100%;
	height: 4px;
`

const NavbarSection = styled.section`
	background-color: transparent;
	height: 72px;
	@media only screen and (max-width: 768px) {
		height: auto;
	}
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
	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
	h1 {
		font-size: 24px;
		display: flex;
		align-items: center;
		letter-spacing: 0.2px;
		margin-left: 20px;
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
`

export default Navbar
