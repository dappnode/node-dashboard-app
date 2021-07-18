import React from 'react'
import toast from 'react-hot-toast'
import { ETHERSCAN } from '../../configuration'

export function showPendingStake(
	amount: string,
	network: number,
	txHash: string,
): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			You are staking {amount} tokens. Check the status of your
			transaction{' '}
			<a
				target='_blank'
				href={etherscan}
				rel='noreferrer'
				style={{ color: 'white' }}
			>
				here
			</a>
			.
		</span>,
	)
}

export function showFailedStake(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.error(
		<span>
			Your staking failed! Check your transaction{' '}
			<a
				target='_blank'
				href={etherscan}
				rel='noreferrer'
				style={{ color: 'white' }}
			>
				here
			</a>
			.
		</span>,
	)
}

export function showConfirmedStake(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			Staking{' '}
			<a
				target='_blank'
				href={etherscan}
				rel='noreferrer'
				style={{ color: 'white' }}
			>
				confirmed
			</a>
			! You are generating rewards!
		</span>,
	)
}
