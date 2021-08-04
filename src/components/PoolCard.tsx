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

	const { stakedLpTokens, notStakedLpTokensWei, earned } = stakePoolInfo

	return (
		<PoolCardSection
			poolState={poolState}
			disabled={disabled}
			border={
				isMainnet(network) ? '2px solid #86bde4' : '2px solid #86e4dd'
			}
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
					displayToken={earned.displayToken}
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
					displayToken={earned.displayToken}
				/>
			)}
			{poolState === 'withdraw' && (
				<Withdraw
					stakedLpTokens={stakedLpTokens}
					withdraw={handleWithdraw}
					close={() => setPoolState('default')}
					hasLiquidityPool={hasLiquidityPool}
					disabled={disabled}
					stakePoolInfo={stakePoolInfo}
					displayToken={earned.displayToken}
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
	const {
		APR,
		stakedLpTokens,
		earned,
		provideLiquidityLink,
		reserves,
		poolTotalSupply,
	} = stakePoolInfo
	let amountToken0
	let amountToken1
	if (reserves && stakedLpTokens && stakedLpTokens > 0) {
		const [_reserve0, _reserve1] = reserves
		const stakedLpTokensBigNumber = ethers.utils.parseEther(
			stakedLpTokens.toString(),
		)
		amountToken0 = ethers.utils.formatEther(
			stakedLpTokensBigNumber
				.mul(ethers.BigNumber.from(_reserve0))
				.div(ethers.BigNumber.from(poolTotalSupply)),
		)
		amountToken1 = ethers.utils.formatEther(
			stakedLpTokensBigNumber
				.mul(ethers.BigNumber.from(_reserve1))
				.div(ethers.BigNumber.from(poolTotalSupply)),
		)
	}
	return (
		<>
			<div style={{ width: '96%' }}>
				<SpaceBetween>
					<NetworkLabel network={network} />
					<label>{platform}</label>
				</SpaceBetween>
				<h1>
					<img alt='logo' src={logo} />
					{isMainnet(network) ? name : earned.displayToken}
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
						<b>{`${
							hasLiquidityPool ? 'LP' : earned.displayToken
						} token:`}</b>{' '}
						{stakedLpTokens && (
							<div className='pool-info-text'>
								{convertEthHelper(stakedLpTokens, 6)}
							</div>
						)}
					</h2>
					{!disabled && (
						<SimpleButton onClick={manage}>Manage</SimpleButton>
					)}
					{amountToken0 && amountToken1 && (
						<div className='pool-info-text'>
							<label>
								{convertEthHelper(amountToken1, 4)} NODE /{' '}
								{convertEthHelper(amountToken0, 4)} ETH
							</label>
						</div>
					)}
				</SpaceBetween>
				<h2>
					<b>Earned:</b>{' '}
					{earned && (
						<div className='pool-info-text'>
							<Earned>
								{convertEthHelper(earned.amount, 4)}
							</Earned>
							<Token>{earned.displayToken}</Token>
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
							: `Stake ${earned.displayToken} tokens`}
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
	displayToken,
}) => (
	<FullHeightCenter>
		<ClosePool onClick={close}>
			<img alt='close' src='/assets/closePool.svg' />
		</ClosePool>
		<div>
			<Inter600>
				Manage your {`${hasLiquidityPool ? 'LP' : displayToken}`} tokens
			</Inter600>
			<Inter400>
				You currently have <b>{convertEthHelper(stakedLpTokens, 4)}</b>{' '}
				staked {`${hasLiquidityPool ? 'LP' : displayToken}`} tokens and{' '}
				<b>
					{convertEthHelper(
						ethers.utils.formatEther(notStakedLpTokensWei),
						2,
					)}
				</b>{' '}
				in your wallet.
			</Inter400>
			<Button disabled={disabled} onClick={deposit}>
				Deposit {`${hasLiquidityPool ? 'LP' : displayToken}`} tokens
			</Button>
			<Button disabled={disabled} onClick={withdraw}>
				Withdraw {`${hasLiquidityPool ? 'LP' : displayToken}`} tokens
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
	displayToken: string
}
const Deposit = ({
	close,
	deposit,
	stakedLpTokens,
	notStakedLpTokensWei,
	hasLiquidityPool,
	disabled,
	displayToken,
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
					Deposit {`${hasLiquidityPool ? 'LP' : displayToken}`} tokens
				</Inter600>
				<Inter400>
					You currently have{' '}
					<b>{convertEthHelper(stakedLpTokens, 6)}</b> staked{' '}
					{`${hasLiquidityPool ? 'LP' : displayToken}`} tokens.
					Deposit more to accrue more rewards.
				</Inter400>
				<div>
					<label>
						{`Balance: ${convertEthHelper(
							ethers.utils.formatEther(notStakedLpTokensWei),
							4,
						)} ${hasLiquidityPool ? 'LP tokens' : displayToken}`}
					</label>
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
					Deposit {`${hasLiquidityPool ? 'LP' : displayToken}`} tokens
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
	stakePoolInfo,
	displayToken,
}) => {
	const [amount, setAmount] = useState<string>('0')
	const [displayAmount, setDisplayAmount] = useState('0')
	const [displayAmountLpTokens, setDisplayAmountLpTokens] =
		useState<string>(undefined)

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
			setValueTokensLp(newAmount)
		},
		[stakedLpTokens],
	)

	const setValueTokensLp = useCallback(
		(newAmountLpToken: BigNumber): void => {
			const { reserves, poolTotalSupply } = stakePoolInfo
			let amountToken0
			let amountToken1
			if (reserves && newAmountLpToken && stakedLpTokens > 0) {
				const [_reserve0, _reserve1] = reserves
				const newAmountLpTokenBigNumber = ethers.utils.parseEther(
					newAmountLpToken.toString(),
				)
				amountToken0 = ethers.utils.formatEther(
					newAmountLpTokenBigNumber
						.mul(ethers.BigNumber.from(_reserve0))
						.div(ethers.BigNumber.from(poolTotalSupply)),
				)
				amountToken1 = ethers.utils.formatEther(
					newAmountLpTokenBigNumber
						.mul(ethers.BigNumber.from(_reserve1))
						.div(ethers.BigNumber.from(poolTotalSupply)),
				)
				setDisplayAmountLpTokens(
					`${convertEthHelper(
						amountToken1,
						4,
					)} NODE / ${convertEthHelper(amountToken0, 4)} ETH`,
				)
			}
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
					{`Withdraw ${
						hasLiquidityPool ? 'LP' : displayToken
					} tokens`}
				</Inter600>
				<Inter400>
					You currently have {convertEthHelper(stakedLpTokens, 6)}{' '}
					staked {`${hasLiquidityPool ? 'LP' : displayToken}`} tokens.
					Enter the amount you’d like to withdraw.
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
					{displayAmountLpTokens && (
						<div className='pool-tokens-text'>
							<label>{displayAmountLpTokens}</label>
						</div>
					)}
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
					{`Withdraw ${
						hasLiquidityPool ? 'LP' : displayToken
					} tokens`}
				</GreenButton>
			</div>
		</FullHeightCenter>
	)
}

export default PoolCard
