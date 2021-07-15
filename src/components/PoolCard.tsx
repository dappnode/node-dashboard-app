import React, { useCallback, useState } from 'react'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import APRDetails from './APRDetails'
import {
	FullHeightCenter,
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
import { bn, convertEthHelper } from '../lib/numbers'
import NetworkLabel from './NetworkLabel'
import { isMainnet } from '../lib/web3-utils'

type PoolCardProps = {
	handleStake: (amount: string) => void
	disabled: boolean
	network: number
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
	disabled,
	network,
}: PoolCardProps) {
	const [poolState, setPoolState] = useState('default')

	const { stakedLpTokens, notStakedLpTokensWei } = stakePoolInfo

	return (
		<PoolCardSection
			poolState={poolState}
			disabled={disabled}
			border={isMainnet(network) ? '2px solid #86bde4' : '2px solid #86e4dd'}
		>
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
					disabled={disabled}
					network={network}
				/>
			)}
			{poolState === 'manage' && (
				<Manage
					stakedLpTokens={stakedLpTokens}
					notStakedLpTokensWei={notStakedLpTokensWei}
					deposit={() => setPoolState('deposit')}
					withdraw={() => setPoolState('withdraw')}
					close={() => setPoolState('default')}
					hasLiquidityPool={hasLiquidityPool}
					disabled={disabled}
				/>
			)}
			{poolState === 'deposit' && (
				<Deposit
					disabled={disabled}
					stakedLpTokens={stakedLpTokens}
					notStakedLpTokensWei={notStakedLpTokensWei}
					hasLiquidityPool={hasLiquidityPool}
					deposit={handleStake}
					close={() => setPoolState('default')}
				/>
			)}
			{poolState === 'withdraw' && (
				<Withdraw
					stakedLpTokens={stakedLpTokens}
					withdraw={handleWithdraw}
					close={() => setPoolState('default')}
					hasLiquidityPool={hasLiquidityPool}
					disabled={disabled}
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
	disabled = false,
	network,
}) => {
	const { APR, stakedLpTokens, earned, provideLiquidityLink } = stakePoolInfo
	return (
		<>
			<div style={{ width: '96%' }}>
				<SpaceBetween>
					<label>{platform}</label>
					<NetworkLabel network={network} />
				</SpaceBetween>
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
					<APRDetails
						APR={APR}
						provideLiquidityLink={provideLiquidityLink}
						disabled={disabled}
					/>
				</SpaceBetween>
				<SpaceBetween>
					<h2>
						<b>{`${hasLiquidityPool ? 'LP' : 'NODE'} token:`}</b>{' '}
						{stakedLpTokens && (
							<div className='pool-info-text'>
								{convertEthHelper(stakedLpTokens, 6)}
							</div>
						)}
					</h2>
					{!disabled && (
						<SimpleButton onClick={manage}>Manage</SimpleButton>
					)}
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
					<Button
						disabled={disabled}
						onClick={() => {
							const win = window.open(
								provideLiquidityLink,
								'_blank',
							)
							if (win) win.focus()
						}}
					>
						Provide liquidity{' '}
						<img
							src={
								disabled
									? '/assets/external-link-gray.svg'
									: '/assets/external-link-green.svg'
							}
							alt='external'
						/>
					</Button>
				)}
				{(earned.amount.eq(0) || !hasLiquidityPool) && (
					<Button disabled={disabled} onClick={deposit}>
						{hasLiquidityPool
							? 'Stake LP tokens'
							: 'Stake NODE tokens'}
					</Button>
				)}
				{earned.amount.gt(0) && (
					<GreenButton
						disabled={disabled}
						className='long'
						onClick={harvest}
					>
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
	disabled,
	hasLiquidityPool,
	notStakedLpTokensWei,
}) => (
	<FullHeightCenter>
		<ClosePool onClick={close}>
			<img alt='close' src='/assets/closePool.svg' />
		</ClosePool>
		<div>
			<Inter600>
				Manage your {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens
			</Inter600>
			<Inter400>
				You currently have <b>{convertEthHelper(stakedLpTokens, 6)}</b>{' '}
				staked {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens
			</Inter400>
			<Button disabled={disabled} onClick={deposit}>
				Deposit {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens
			</Button>
			<Button disabled={disabled} onClick={withdraw}>
				Withdraw {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens
			</Button>
		</div>
	</FullHeightCenter>
)

interface DepositProps {
	close: () => void
	deposit: (amount: string) => void
	stakedLpTokens: string
	hasLiquidityPool: boolean
	notStakedLpTokensWei: string
	disabled: boolean
}
const Deposit = ({
	close,
	deposit,
	stakedLpTokens,
	notStakedLpTokensWei,
	hasLiquidityPool,
	disabled,
}: DepositProps) => {
	const [amount, setAmount] = useState<string>('0')
	const [displayAmount, setDisplayAmount] = useState('0')

	const setAmountPercentage = useCallback(
		(percentage: number): void => {
			const newAmount = ethers.BigNumber.from(notStakedLpTokensWei)
				.mul(percentage)
				.div(100)
				.toString()
			setAmount(newAmount)
			setDisplayAmount(
				convertEthHelper(ethers.utils.formatEther(newAmount), 6, false),
			)
		},
		[notStakedLpTokensWei],
	)

	const onChange = useCallback(value => {
		setDisplayAmount(convertEthHelper(value, 6, false))
		setAmount(ethers.utils.parseUnits(value).toString())
	}, [])

	return (
		<FullHeightCenter>
			<ClosePool onClick={close}>
				<img alt='close' src='/assets/closePool.svg' />
			</ClosePool>
			<div>
				<Inter600>
					Deposit {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens
				</Inter600>
				<Inter400>
					You currently have{' '}
					<b>{convertEthHelper(stakedLpTokens, 6)}</b> staked{' '}
					{`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens. Deposit more
					to accrue more rewards.
				</Inter400>
				<div>
					<Input
						type='number'
						placeholder='Amount'
						value={displayAmount}
						disabled={disabled}
						onChange={e => onChange(e.target.value || '0')}
					/>
					<div>
						<Inter500Green
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(25)}
							disabled={disabled}
						>
							25%
						</Inter500Green>
						<Inter500Green
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(50)}
							disabled={disabled}
						>
							50%
						</Inter500Green>
						<Inter500Green
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(75)}
							disabled={disabled}
						>
							75%
						</Inter500Green>
						<Inter500Green
							onClick={() => setAmountPercentage(100)}
							disabled={disabled}
						>
							100%
						</Inter500Green>
					</div>
				</div>
				<GreenButton
					onClick={() => deposit(amount)}
					className='long'
					style={{ marginTop: '16px' }}
					disabled={
						disabled ||
						bn(amount).isZero() ||
						bn(amount).gt(bn(notStakedLpTokensWei))
					}
				>
					Deposit {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens
				</GreenButton>
			</div>
		</FullHeightCenter>
	)
}

const Withdraw = ({
	close,
	stakedLpTokens,
	hasLiquidityPool,
	withdraw,
	disabled,
}) => {
	const [amount, setAmount] = useState<string>('0')
	const [displayAmount, setDisplayAmount] = useState('0')

	const setAmountPercentage = useCallback(
		(percentage: number): void => {
			// eslint-disable-next-line no-underscore-dangle
			const _stakedLpTokens: BigNumber =
				stakedLpTokens instanceof BigNumber
					? stakedLpTokens
					: new BigNumber(stakedLpTokens)
			const newAmount = _stakedLpTokens.times(percentage).div(100)
			setAmount(newAmount.times(10 ** 18).toFixed(0))
			setDisplayAmount(convertEthHelper(newAmount, 6, false))
		},
		[stakedLpTokens],
	)

	const onChange = useCallback(value => {
		setDisplayAmount(convertEthHelper(value, 6, false))
		setAmount(ethers.utils.parseUnits(value).toString())
	}, [])
	return (
		<FullHeightCenter>
			<ClosePool onClick={close}>
				<img alt='close' src='/assets/closePool.svg' />
			</ClosePool>
			<div>
				<Inter600>
					Withdraw {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens
				</Inter600>
				<Inter400>
					You currently have {convertEthHelper(stakedLpTokens, 6)}{' '}
					staked {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens. Enter
					the amount you’d like to withdraw.
				</Inter400>
				<div>
					<Input
						disabled={disabled}
						type='number'
						placeholder='Amount'
						value={displayAmount}
						onChange={e => onChange(e.target.value || '0')}
					/>
					<div>
						<Inter500Green
							disabled={disabled}
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(25)}
						>
							25%
						</Inter500Green>
						<Inter500Green
							disabled={disabled}
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(50)}
						>
							50%
						</Inter500Green>
						<Inter500Green
							disabled={disabled}
							style={{ marginRight: '10px' }}
							onClick={() => setAmountPercentage(75)}
						>
							75%
						</Inter500Green>
						<Inter500Green
							disabled={disabled}
							onClick={() => setAmountPercentage(100)}
						>
							100%
						</Inter500Green>
					</div>
				</div>
				<GreenButton
					onClick={() => withdraw(amount)}
					className='long'
					style={{ marginTop: '16px' }}
					disabled={
						disabled ||
						bn(amount).isZero() ||
						bn(amount).gt(
							bn(stakedLpTokens.times(10 ** 18).toFixed(0)),
						)
					}
				>
					Withdraw {`${hasLiquidityPool ? 'LP' : 'NODE'}`} tokens
				</GreenButton>
			</div>
		</FullHeightCenter>
	)
}

export default PoolCard
