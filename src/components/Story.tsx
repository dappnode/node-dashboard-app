import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, GreenButton, Inter400, Inter700 } from './Styles'

const FirstCard = () => (
	<>
		<Inter700 className='large'>
			First, a little bit about DAppNode
		</Inter700>
		<Inter400Subtitle>
			DAppNode has been helping people run nodes without any technical
			knowledge since December 2017.
		</Inter400Subtitle>
		<Inter400Subtitle>
			<b>At a micro level</b>: We give users sovereignty over their access
			to the web3 world - no 3rd parties or gatekeepers
			involved!
			<br />
			<b>At a macro level</b>: We help decentralized infrastructure like
			Ethereum reduce centralization risks by increasing the number
			of residential nodes.
		</Inter400Subtitle>
		<Inter400Subtitle>
			We do this through free, open-source software that anyone can install
			on almost any type of dedicated hardware, and through partners
			providing plug-and-play pre-installed devices.
		</Inter400Subtitle>
	</>
)

const SecondCard = () => (
	<>
		<Inter700 className='large'>The DAppNode DAO</Inter700>
		<Inter400Subtitle>
			Over the years, we have built a community around our principles,
			asserting that access to uncensorable, resilient and distributed infrastructure 
			is better than than leaning on gatekeepers, big players and middlemen.
		</Inter400Subtitle>
		<Inter400Subtitle>
			This community can now self-organize, level up, evolve and steward
			these principles. We are going from community to ecosystem,
			leveraging and coordinating Node Runners to uphold the values of decentralization
			from the infrastructure up.
		</Inter400Subtitle>
	</>
)

const ThirdCard = () => (
	<>
		<Inter700 className='large'>The NODEconomy</Inter700>
		<Inter400Subtitle>
			To govern this ecosystem, we&apos;ve created the NODE token.
		</Inter400Subtitle>
		<Inter400Subtitle>
			For you who have supported DAppNode over the past
			years, there&apos;s a NODEdrop waiting for you at the end of this
			quiz! To ensure long-term alignment, 90% of these NODE will also be
			given to you via a NODEstream over for the next 3 years.
		</Inter400Subtitle>
		<Inter400Subtitle>
			To contribute further to the ecosystem, NODE holders can participate
			in NODEstaking, be it by providing liquidity or staking NODE for
			governance powers.
		</Inter400Subtitle>
	</>
)

function Story({ setRewards, setQuiz }) {
	const cards = [<FirstCard />, <SecondCard />, <ThirdCard />]

	const [currentCard, setCurrentCard] = useState<number>(0)

	function handleNext() {
		const nextCard = currentCard + 1

		if (nextCard >= cards.length) {
			setQuiz()
		} else {
			setCurrentCard(nextCard)
		}
	}

	function handleBack() {
		const lastCard = currentCard - 1

		if (lastCard < 0) {
			setRewards()
		} else {
			setCurrentCard(lastCard)
		}
	}

	return (
		<>
			<div>{cards[currentCard]}</div>
			<SpaceBetween style={{ margin: '16px 0' }}>
				<QuizNumber>{`${currentCard + 1}/3`}</QuizNumber>
				<div>
					<Button
						onClick={handleBack}
						style={{ marginRight: '16px' }}
					>
						Back
					</Button>
					<GreenButton onClick={handleNext}>Next</GreenButton>
				</div>
			</SpaceBetween>
		</>
	)
}

export const Flex = styled.div`
	display: flex;
	align-items: center;
`

const SpaceBetween = styled(Flex)`
	justify-content: space-between;
`

const Inter400Subtitle = styled(Inter400)`
	color: #5c706f;
	font-size: 20px;
	line-height: 28px;
`

const QuizNumber = styled.div`
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 32px;
	color: #c4f3ef;
`

export default Story
