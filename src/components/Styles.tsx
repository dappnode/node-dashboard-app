import styled from 'styled-components'

export const Inter700 = styled.h1`
	font-family: 'Inter-Bold';
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	align-items: center;
	color: #35403f, 100%;
	margin-right: 10px;
	img {
		padding-right: 5px;
	}
	&.large {
		font-size: 24px;
	}
`

export const Inter600 = styled.p`
	font-family: 'Inter-Bold';
	font-weight: bold;
	font-size: 14px;
	line-height: 17px;
	color: #353a41;
`

export const Inter500 = styled.p`
	font-family: 'Inter-Medium';
	font-weight: 500;
	font-size: 14px;
	line-height: 17px;
	color: #222a29;
`

export const Inter500Green = styled.button`
	color: ${props => (props.disabled ? '#DDE3E3' : '#23c8bc')};
	border: none;
	background: transparent;
	font-family: 'Inter-Medium';
	font-weight: 500;
	font-size: 12px;
	line-height: 17px;
	cursor: pointer;
`

export const Inter400 = styled.p`
	font-family: 'Inter';
	font-size: 14px;
	line-height: 17px;
	color: #353a41;
`

export const RoundedCard = styled.div`
	background: #ffffff;
	box-shadow: 0px 2px 2px rgba(8, 43, 41, 0.04),
		0px 2px 16px rgba(8, 43, 41, 0.06);
	border-radius: 24px;
`

export const BigCurrency = styled.div`
	display: flex;
	align-items: flex-end;
	h1 {
		font-family: 'Inter-Bold';
		font-weight: 500;
		font-size: 24px;
		line-height: 29px;
		margin: 0 5px 0 0 !important;
		color: #222a29;
	}
	h2 {
		font-family: 'Inter-Bold';
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		align-items: flex-end;
		color: #455453;
		margin: 0;
		display: inline-flex;
	}
`

export const Input = styled.input`
	height: 48px;
	padding-left: 10px;
	background: #f4f5f6;
	border-radius: 8px;
	height: 48px;
	color: #222a29;
	font-family: 'Inter';
	border: solid 0px transparent;
	font-size: 14px;
	line-height: 16px;
	margin-top: 16px;
	width: calc(100% - 12px);
	&:focus {
		outline: none;
		background: #eefcfb;
	}
	&[type='number'] {
		-moz-appearance: textfield;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`

export const SpaceBetween = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const FullHeightCenter = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	.pool-tokens-text label {
		font-family: Inter;
		font-style: normal;
		font-size: 12px;
		line-height: 12px;
		letter-spacing: 0em;
		color: gray;
		text-transform: uppercase;
	}
`

export const FlexRow = styled.div`
	gap: 24px;
	display: flex;
	flex-direction: row;
`

export const GreenButton = styled.button`
	background: ${props =>
		props.disabled
			? '#DDE3E3'
			: 'linear-gradient(99.61deg, #86e4dd -0.13%, #2fbcb2 99.3%)'};

	border: solid 0px transparent;
	border-radius: 27px;
	font-family: 'Inter-Bold';
	font-weight: bold;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	color: white;
	cursor: pointer;
	padding: 8px 16px;
	margin: 3px 0px;
	box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
		0px 0px 8px rgba(8, 43, 41, 0.06);
	&:hover {
		background: ${props =>
			props.disabled
				? '#DDE3E3'
				: 'linear-gradient(99.61deg, #76ccc5 -0.13%, #218c84 99.3%)'};

		transition: all 0.25s ease-in-out;
	}
	&.long {
		width: -webkit-fill-available;
	}
`

export const BlueButton = styled.button`
	background: ${props =>
		props.disabled
			? '#DDE3E3'
			: 'linear-gradient(99.61deg, #86BDE4 -0.13%, #0D91F0 99.3%);'};
	border: solid 0px transparent;
	border-radius: 27px;
	font-family: 'Inter-Bold';
	font-weight: bold;
	font-size: 12px;
	line-height: 16px;
	text-align: center;
	color: white;
	padding: 8px 16px;
	cursor: pointer;
	box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
		0px 0px 8px rgba(8, 43, 41, 0.06);
	&:hover {
		background: ${props =>
			props.disabled
				? '#DDE3E3'
				: 'linear-gradient(99.61deg, #7cadd0 -0.13%, #075c98 99.3%);'};
		transition: all 0.25s ease-in-out;
	}
`

export const Button = styled.a`
	color: #2fbcb2;
	cursor: pointer;
	margin: 3px 0px;
	background: transparent;
	border: solid 1px #2fbcb2;
	font-family: 'Interstate', sans-serif;
	border-radius: 38px;
	padding: 25px 100px;
	display: inline-block;
	font-size: 12px;
	letter-spacing: 0.27px;
	line-height: 16px;
	text-align: center;
	padding: 8px 16px;
`

export const WhiteGreenButtonLink = styled.button`
	color: ${props => (props.disabled ? '#DDE3E3' : '#2FBCB2')};
	background: transparent;
	border: ${props =>
		props.disabled ? 'solid 1px #DDE3E3' : 'solid 1px #2FBCB2'};
	font-family: 'Interstate', sans-serif;
	border-radius: 38px;
	padding: 25px 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	width: -webkit-fill-available;
	font-size: 16px;
	letter-spacing: 0.27px;
	line-height: 19px;
	text-align: center;
	padding: 11px;
	margin: 6px 0px;
	cursor: pointer;
	img {
		padding-left: 5px;
	}
`

export const WhiteGreenLink = styled.a`
	color: #2fbcb2;
	background: transparent;
	font-family: 'Inter-Bold';
	padding: 25px 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	letter-spacing: 0.27px;
	line-height: 19px;
	text-align: center;
	padding: 11px;
	margin: 6px 0px;
	cursor: pointer;
	text-underline-offset: 3px;
	text-decoration-line: underline;
	img {
		margin-left: 10px;
	}
`

export const SimpleButton = styled.button`
	font-family: 'Inter-Bold';
	font-style: normal;
	font-weight: bold;
	font-size: 12px;
	line-height: 15px;
	text-align: center;
	color: #2fbcb2;
	background: transparent;
	border: solid 0px transparent;
	cursor: pointer;
`

export const NavbarButton = styled.div`
	background: white;
	border-radius: 8px;
	text-transform: uppercase;
	border: 0px solid transparent;
	padding: 8px 10px;
	font-family: 'Inter-Bold', sans-serif;
	font-weight: bold;
	font-size: 12px;
	line-height: 15px;
	text-align: right;
	color: #455453;
	margin-left: 15px;
	cursor: pointer;
	span {
		color: #455453c7;
		padding-left: 3px;
	}
`

export const LightGreenButton = styled(NavbarButton)`
	background: #c4f3ef;
	color: #144b52;
`

export const LightBlueButton = styled(NavbarButton)`
	background: #42a7f0;
	color: #fff;
`
export const GRADIENT_TEXT = styled.span`
	background-color: #1effef;
	background-image: linear-gradient(45deg, #1effef, #2f78bc);
	background-size: 100%;
	-webkit-background-clip: text;
	-moz-background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-text-fill-color: transparent;
`
