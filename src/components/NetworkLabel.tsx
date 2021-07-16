import React, { FC } from 'react'
import styled from 'styled-components'
import { useOnboard } from '../hooks/useOnboard'
import { isDN, isMainnet } from '../lib/web3-utils'

type NetworkLabelProps = {
	network: number
}
const NetworkLabel: FC<NetworkLabelProps> = ({ network }) => {
	const { network: walletNetwork } = useOnboard()
	let className: string
	let text: string

	switch (true) {
		case isMainnet(network):
			className = 'blue'
			text = 'ETH'
			break

		case isDN(network):
			className = 'green'
			text = 'xDAI'
			break

		default:
	}

	if (walletNetwork !== network) {
		className = 'disabled'
	}

	return <Label className={className}>{text}</Label>
}

const Label = styled.label`
	background: #eefcfb;
	border-radius: 16px;
	padding: 4px 8px;
	font-family: 'Inter-Bold';
	font-weight: bold;
	font-size: 12px;
	line-height: 15px;
	color: #23c8bc;
	margin: 8px 0;
	text-transform: none !important;
	&.green {
		color: #23c8bc;
		background: #eefcfb;
	}
	&.blue {
		color: #0d91f0;
		background: #eef6fc;
	}
	&.disabled {
		color: #819896;
		background: #f4f6f6;
	}
`

export default NetworkLabel
