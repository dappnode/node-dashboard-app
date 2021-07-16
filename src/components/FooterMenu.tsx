import React from 'react'
import styled from 'styled-components'
import FooterMenuItem from './FooterMenuItem'

const FooterMenu = () => (
	<FooterMenuSection>
		<Container>
			<div>
				<FooterMenuItem
					title='dappnode.io'
					icon='/assets/external-link.svg'
					link='https://dappnode.io'
				/>
				<FooterMenuItem
					title='dao.dappnode.io'
					icon='/assets/external-link.svg'
					link='https://dao.dappnode.io'
				/>
			</div>
			<div>
				<FooterMenuItem
					title='Forum'
					icon='/assets/external-link.svg'
					link='https://discourse.dappnode.io'
				/>
				<FooterMenuItem
					title='Github'
					icon='/assets/github-link.svg'
					link='https://github.com/dappnode'
				/>
				<FooterMenuItem
					title='Discord'
					icon='/assets/discord-link.svg'
					link='https://discord.gg/c28an8dA5k'
				/>
				<FooterMenuItem
					title='Twitter'
					icon='/assets/twitter-link.svg'
					link='https://twitter.com/dappnode'
				/>
			</div>
		</Container>
	</FooterMenuSection>
)

const FooterMenuSection = styled.section`
	background-color: transparent;
	text-align: center;
	overflow: hidden;
	margin: 20px 0px;
	@media only screen and (max-width: 768px) {
		height: auto;
	}
`

const Container = styled.div`
	width: 95%;
	margin: auto;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
`

export default FooterMenu
