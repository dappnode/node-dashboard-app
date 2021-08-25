import React from 'react'
import styled from 'styled-components'

function ToggleButton({
	checked,
	onClick,
	text,
	selectedText,
	disabled = false,
}): JSX.Element {
	return (
		<ToggleMode onClick={onClick} disabled={disabled}>
			<img
				alt='toggle'
				src={
					checked
						? '/assets/toggle_on_black_24dp.svg'
						: '/assets/toggle_off_black_24dp.svg'
				}
			/>
			{checked ? selectedText ?? text : text}
		</ToggleMode>
	)
}

export const ToggleMode = styled.button`
	background: transparent;
	border: solid 0px transparent;
	width: auto;
	display: flex;
	align-items: center;
	cursor: pointer;
	font-family: 'Inter-Bold';
	font-style: normal;
	font-size: 12px;
	line-height: 15px;
	color: #2fbcb2;
	img {
		margin-right: 2px;
	}
`

export default ToggleButton
