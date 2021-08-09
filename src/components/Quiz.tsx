import React, { useState } from 'react'
import styled from 'styled-components'

import { questions } from '../helpers/questions'
import { showCorrectAnswer } from '../lib/notifications/drop'

import RadioButton from './RadioButton'
import { Button, GreenButton, Inter400, Inter700 } from './Styles'

function Quiz({ setClaim }) {
	const [currentQuestion, setCurrentQuestion] = useState<number>(0)
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
	const [incorrectAnswer, setIncorrectAnswer] = useState<boolean>(false)

	function handleSubmit() {
		const correctQuestion =
			questions[currentQuestion].correct ===
			questions[currentQuestion].answers[selectedAnswer]

		if (!correctQuestion) {
			setSelectedAnswer(null)
			setIncorrectAnswer(true)
			return
		}

		showCorrectAnswer()
		setSelectedAnswer(null)
		setIncorrectAnswer(false)

		const lastQuestion = currentQuestion + 1 === questions.length

		if (lastQuestion) {
			setClaim()
			return
		}

		const nextQuestion = currentQuestion + 1
		setCurrentQuestion(nextQuestion)
	}

	return (
		<>
			<Inter700 className='large'>
				Let’s check what you’ve learned so far.
			</Inter700>
			<RadioInput />
			<Inter700>{questions[currentQuestion].question}</Inter700>
			{questions[currentQuestion].answers.map((answer, index) => (
				<QuizAnswer
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					selected={selectedAnswer === index}
					onClick={() => setSelectedAnswer(index)}
				>
					<RadioButton checked={selectedAnswer === index}>
						{answer}
					</RadioButton>
				</QuizAnswer>
			))}
			<SpaceBetween style={{ margin: '16px 0' }}>
				<QuizNumber>{`${currentQuestion + 1}/3`}</QuizNumber>
				<Flex>
					{incorrectAnswer && (
						<div style={{ color: '#F36359', marginRight: '10px' }}>
							Incorrect answer. Try again!
						</div>
					)}
					<GreenButton
						onClick={handleSubmit}
						disabled={selectedAnswer === null}
					>
						Submit
					</GreenButton>
				</Flex>
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

const QuizNumber = styled.div`
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 32px;
	color: #c4f3ef;
`

const QuizAnswer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding: 24px;
	margin: 10px 0;
	cursor: pointer;
	border-radius: 16px;
	border: 1px solid #becac9;

	&:hover {
		border: 1px solid #86e4dd;
	}

	${props =>
		props.selected &&
		` 
    	border: 1px solid #86e4dd;
		`}
`

const RadioMark = styled.span`
	display: inline-block;
	position: relative;
	border: 1px solid #777777;
	width: 14px;
	height: 14px;
	left: 0;
	border-radius: 50%;
	margin-right: 10px;
	vertical-align: middle;
`

const RadioInput = styled.input`
	position: absolute;
	visibility: hidden;
	display: none;
	&:checked + ${RadioMark} {
		&::after {
			content: '';
			display: block;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: blue;
			left: 2px;
			top: 15%;
			position: absolute;
		}
	}
`

export default Quiz
