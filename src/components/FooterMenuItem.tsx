import React from 'react'
import styled from 'styled-components'

type FooterMenuItemProps = {
	title: string
	icon: string
	link: string
}
function FooterMenuItem({ title, icon, link }: FooterMenuItemProps) {
	return (
		<Item href={link} target='_blank'>
			{title}
			<img alt='link' src={icon} />
		</Item>
	)
}

const Item = styled.a`
	font-family: Inter;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	align-items: center;
	text-align: center;
	letter-spacing: 0.2px;
	color: #222a29;
	display: inline-block;
	padding: 14px;
	@media only screen and (max-width: 768px) {
		padding: 9px;
	}
	img {
		margin-left: 4px;
	}
`

export default FooterMenuItem
