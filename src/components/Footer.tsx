import React from 'react'
import styled from 'styled-components'
import FooterMenu from './FooterMenu'

const Footer = () => (
	<FooterSection>
		<FooterMenu />
	</FooterSection>
)

const FooterSection = styled.section`
	height: auto;
	background-position: top;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
`

export default Footer
