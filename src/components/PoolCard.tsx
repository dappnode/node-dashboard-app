import React, { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import APRDetails from './APRDetails'
import {
	GreenButton,
	Input,
	Inter400,
	Inter500Green,
	Inter600,
	SimpleButton,
} from './Styles'
import {
	Button,
	ClosePool,
	Earned,
	PoolCardSection,
	SpaceBetween,
	Token,
} from './PoolCardStyle'
import { convertEthHelper } from '../lib/numbers'

type PoolCardProps = {
	handleStake: (amount: string) => void
	[key: string]: any
}
function PoolCard({
	name,
	platform,
	composition,
	stakePoolInfo,
	logo,
	hasLiquidityPool = false,
	handleStake,
	handleHarvest,
	handleWithdraw,
}: PoolCardProps) {
	const [poolState, setPoolState] = useState('default')

	const { stakedLpTokens, notStakedLpTokens } = stakePoolInfo

	return (
		<PoolCardSection poolState={poolState}>
			{poolState === 'default' && (
				<Principal
					name={name}
					logo={logo}
					platform={platform}
					composition={composition}
					stakePoolInfo={stakePoolInfo}
					manage={() => setPoolState('manage')}
					deposit={() => setPoolState('deposit')}
					hasLiquidityPool={hasLiquidityPool}
					harvest={handleHarvest}
				/>
			)}
			{poolState === 'manage' && (
				<Manage
					stakedLpTokens={stakedLpTokens}
					notStakedLpTokens={notStakedLpTokens}
					deposit={() => setPoolState('deposit')}
					withdraw={() => setPoolState('withdraw')}
					close={() => setPoolState('default')}
				/>
			)}
			{poolState === 'deposit' && (
				<Deposit
					stakedLpTokens={stakedLpTokens}
					notStakedLpTokens={notStakedLpTokens}
					deposit={handleStake}
					close={() => setPoolState('default')}
				/>
			)}
			{poolState === 'withdraw' && (
				<Withdraw
					stakedLpTokens={stakedLpTokens}
					withdraw={handleWithdraw}
					close={() => setPoolState('default')}
				/>
			)}
		</PoolCardSection>
	)
}

const Principal = ({
	name,
	composition,
	platform,
	stakePoolInfo,
	manage,
	deposit,
	logo,
	hasLiquidityPool,
	harvest,
}) => {
	const { APR, stakedLpTokens, earned, provideLiquidityLink, tokenPrice } =
		stakePoolInfo
	return (
		<>
			<div>
				<label>{platform}</label>
				<h1>
					<img alt='logo' src={logo} /> {name}
				</h1>
				<SpaceBetween>
					<h2>
						<b>APR:</b>{' '}
						{APR && (
							<div className='pool-info-text'>
								{convertEthHelper(APR, 2)}%
							</div>
						)}
					</h2>
					<APRDetails APR={APR} tokenPrice={tokenPrice} />
				</SpaceBetween>
				<SpaceBetween>
					<h2>
						<b>LP token:</b>{' '}
						{stakedLpTokens && (
							<div className='pool-info-text'>
								{convertEthHelper(stakedLpTokens, 6)}
							</div>
						)}
					</h2>
					<SimpleButton onClick={manage}>Manage</SimpleButton>
				</SpaceBetween>
				<h2>
					<b>Earned:</b>{' '}
					{earned && (
						<div className='pool-info-text'>
							<Earned>
								{convertEthHelper(earned.amount, 4)}
							</Earned>
							<Token>{earned.token}</Token>
						</div>
					)}
				</h2>
			</div>
			<div style={{ minWidth: '100%' }}>
				{hasLiquidityPool && (
					<Button href={provideLiquidityLink} target='_blank'>
						Provide liquidity{' '}
						<img
							src='/assets/external-link-green.svg'
							alt='external'
						/>
					</Button>
				)}
				{earned.amount.eq(0) ? (
					<Button onClick={deposit}>Stake LP tokens</Button>
				) : (
					<GreenButton className='long' onClick={harvest}>
						Harvest
					</GreenButton>
				)}
			</div>
		</>
	)
}

const Manage = ({
	deposit,
	withdraw,
	close,
	stakedLpTokens,
	notStakedLpTokens,
}) => (
	<>
		<ClosePool onClick={close}>
			<img alt='close' src='/assets/closePool.svg' />
		</ClosePool>
		<div>
			<Inter600>Manage your LP tokens</Inter600>
			<Inter400>
				You currently have <b>{convertEthHelper(stakedLpTokens, 6)}</b>{' '}
				staked Liquidity Provider tokens
			</Inter400>
			<Button onClick={deposit}>Deposit LP tokens</Button>
			<Button onClick={withdraw}>Withdraw LP tokens</Button>
		</div>
	</>
)

interface DepositProps {
	close: () => void
	deposit: (amount: string) => void
	stakedLpTokens: string
	notStakedLpTokens: string
}
const Deposit = ({
	close,
	deposit,
	stakedLpTokens,
	// eslint-disable-next-line no-unused-vars
	notStakedLpTokens,
}: DepositProps) => {
	const [amount, setAmount] = useState<string>('0')
	const [displayAmount, setDisplayAmount] = useState('0')

	const setAmountPercentage = useCallback(
		(percentage: number): void => {
			const newAmount = ethers.BigNumber.from(notStakedLpTokens)
				.mul(percentage)
				.div(100)
				.toString()
			setAmount(newAmount)
			setDisplayAmount(
				convertEthHelper(ethers.utils.formatEther(newAmount), 6),
			)
		},
		[notStakedLpTokens],
	)

	const onChange = useCallback(value => {
		setDisplayAmount(convertEthHelper(value, 6))
		setAmount(ethers.utils.parseUnits(value).toString())
	}, [])

	return (
		<>
			<ClosePool onClick={close}>
				<img alt='close' src='/assets/closePool.svg' />
			</ClosePool>
			<div>
				<Inter600>Deposit LP tokens</Inter600>
				<Inter400>
					You currently have{' '}
					<b>{convertEthHelper(stakedLpTokens, 6)}</b> staked
					Liquidity Provider tokens. Deposit more to accrue more.
				</Inter400>
				<div>
					<Input
						type='number'
						placeholder='Amount'
						value={displayAmount}
						defaultValue={displayAmount}
						onChange={e => onChange(e.target.value || '0')}
					/>
					<div>
						<Inter500Green
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(25)}
						>
							25%
						</Inter500Green>
						<Inter500Green
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(50)}
						>
							50%
						</Inter500Green>
						<Inter500Green
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(75)}
						>
							75%
						</Inter500Green>
						<Inter500Green onClick={() => setAmountPercentage(100)}>
							100%
						</Inter500Green>
					</div>
				</div>
				<GreenButton
					onClick={() => deposit(amount)}
					className='long'
					style={{ marginTop: '16px' }}
				>
					Deposit LP tokens
				</GreenButton>
			</div>
		</>
	)
}

const Withdraw = ({ close, stakedLpTokens, withdraw }) => {
	const [amount, setAmount] = useState<string>('0')
	const [displayAmount, setDisplayAmount] = useState('0')

	const onChange = useCallback(value => {
		setDisplayAmount(convertEthHelper(value, 6))
		setAmount(ethers.utils.parseUnits(value).toString())
	}, [])
	return (
		<>
			<ClosePool onClick={close}>
				<img alt='close' src='/assets/closePool.svg' />
			</ClosePool>
			<div>
				<Inter600>Withdraw LP tokens</Inter600>
				<Inter400>
					You currently have {convertEthHelper(stakedLpTokens, 6)}{' '}
					staked Liquidity Provider tokens. Enter the amount you’d
					like to withdraw.
				</Inter400>
				<Input
					type='number'
					placeholder='Amount'
					value={displayAmount}
					defaultValue={displayAmount}
					onChange={e => onChange(e.target.value || '0')}
				/>
				<GreenButton
					onClick={() => withdraw(amount)}
					className='long'
					style={{ marginTop: '16px' }}
				>
					Withdraw LP tokens
				</GreenButton>
			</div>
		</>
	)
}

export default PoolCard
