import React from 'react'
import styled from 'styled-components'

function RadioButton({ children, checked }): JSX.Element {
	return (
		<>
			<RadioButtonInput type='radio' name='radio' checked={checked} />
			<RadioButtonLabel />
			<div>{children}</div>
		</>
	)
}

const RadioButtonLabel = styled.label`
	position: absolute;
	left: 20px;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background: white;
	border: 1px solid #becac9;
`
const RadioButtonInput = styled.input`
	opacity: 0;
	z-index: 1;
	cursor: pointer;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	margin-right: 12px;
	&:hover ~ ${RadioButtonLabel} {
		background: transparent;
		&::after {
			content: '';
			display: block;
			border-radius: 50%;
			width: 12px;
			height: 12px;
			margin: 6px;
			background: #23c8bc;
		}
	}
	${props =>
		props.checked &&
		` 
    &:checked + ${RadioButtonLabel} {
      background: ##23C8BC;
      border: 1px solid #23C8BC;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin: 6px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: #23C8BC;
      }
    }
  `}
`

export default RadioButton
