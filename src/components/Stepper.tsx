import React from 'react'
import styled from 'styled-components'

function Stepper() {
	return (
		<Container>
			<ul>
				<li>Welcome!</li>
				<li>Rewards</li>
				<li>About DAppNode</li>
				<li>Quiz</li>
				<li>Claim your airdrop!</li>
			</ul>
		</Container>
	)
}

const Container = styled.div`
	position: fixed;
	transform: translateY(-50%);
	top: 50%;

	ul {
		display: flex;
		counter-reset: step;
		flex-direction: column;
	}

	ul li {
		color: #23c8bc;
		text-align: left;
		font-weight: 700;
		font-size: 14px;
		font-family: 'Inter';
		list-style-type: none;
		position: relative;
	}

	ul li:before {
		display: inline-block;
		content: counter(step);
		counter-increment: step;
		cursor: pointer;
		margin: 10px;
		height: 24px;
		width: 24px;
		color: #fff;
		line-height: 24px;
		text-align: center;
		border-radius: 50%;
		background-color: #23c8bc;
	}

	ul li::after {
		content: ' ';
		position: absolute;
		display: block;
		top: 10px;
		left: 21px;
		width: 2px;
		height: 100%;
		z-index: -1;
		background-color: #23c8bc;
	}

	ul li:last-child::after {
		display: none;
	}
`

export default Stepper
