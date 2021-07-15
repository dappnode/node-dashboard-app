import React, { useState } from 'react'
import styled from 'styled-components'

import { addNodeToken } from '../lib/metamask'

interface AddTokenButtonProps {
	network: number
}

function AddTokenButton({ network }: AddTokenButtonProps): JSX.Element {
	return (
		<Wrapper onClick={() => addNodeToken(network)}>
			<p>Add to MetaMask</p>
			<div>
				<img alt='metamask' src='/assets/metamask.svg' />
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;
	border-radius: 26px;
	background: #ffffff;
	transition: width 400ms;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
		0px 0px 8px rgba(8, 43, 41, 0.06);

	&:hover {
		width: 150px;

		p {
			width: auto;
			height: auto;
		}
	}

	p {
		width: 0;
		height: 0;
		margin: 0 15px;
		font-size: 12px;
		color: #455453;
		font-weight: 500;
		font-family: 'Inter';
	}

	div {
		right: 0;
		display: flex;
		position: absolute;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 0px 1px 1px rgba(8, 43, 41, 0.08),
			0px 0px 8px rgba(8, 43, 41, 0.06);
	}
`

export default AddTokenButton
