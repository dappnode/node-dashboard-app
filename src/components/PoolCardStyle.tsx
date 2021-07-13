import styled from 'styled-components'

interface PoolCardSectionProps {
	poolState: string
}

export const PoolCardSection = styled.section<PoolCardSectionProps>`
	display: flex;
	position: relative;
	flex-flow: column wrap;
	justify-content: ${props =>
		props.poolState === 'default' ? 'space-between' : 'center'};
	align-items: center;
	background-color: white;
	min-width: calc(100% - 24px);
	height: 380px;
	padding: 16px;
	position: relative;
	box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
		0px 2px 8px rgba(8, 43, 41, 0.06);
	border-radius: 16px;
	div {
		width: 100%;
	}
	h1 {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: 28px;
		line-height: 34px;
		color: #22262a;
		display: flex;
		align-items: center;
		margin: 0 10px 0 0px !important;
		img {
			margin-left: -16px;
		}
	}
	label {
		font-family: Inter;
		font-style: normal;
		font-weight: bold;
		font-size: 8px;
		line-height: 10px;
		letter-spacing: 0.07em;
		color: #454b54;
		text-transform: uppercase;
	}
	h2 {
		font-family: Inter;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 20px;
		color: #353a41;
		margin-bottom: 0;
		b {
			font-weight: 600;
		}
	}
`

export const Button = styled.a`
	color: #2fbcb2;
	background: transparent;
	border: solid 1px #2fbcb2;
	font-family: 'Interstate', sans-serif;
	border-radius: 38px;
	padding: 25px 100px;
	display: inline-block;
	width: -webkit-fill-available;
	font-size: 12px;
	letter-spacing: 0.27px;
	line-height: 19px;
	text-align: center;
	text-decoration: none;
	padding: 8px 16px;
	margin: 3px 0px;
	cursor: pointer;
`

export const ClosePool = styled.button`
	background: transparent;
	border: solid 0px transparent;
	width: 50px;
	height: 50px;
	position: absolute;
	cursor: pointer;
	top: 0;
	right: 0;
`

export const SpaceBetween = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
`

export const Earned = styled.h6`
	font-family: 'Inter-Bold';
	font-weight: bold;
	font-size: 28px;
	line-height: 32px;
	color: #222a29;
	margin: 0;
	display: inline;
`

export const Token = styled.h6`
	font-family: 'Inter';
	font-size: 16px;
	line-height: 25px;
	display: inline;
	color: #455453;
	margin: 0 0 0 5px;
`
