import React from 'react'
import toast from 'react-hot-toast'
import { ETHERSCAN } from '../../configuration'

export function showPendingWithdraw(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			Withdrawal submitted! Check the status{' '}
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

export function showFailedWithdraw(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.error(
		<span>
			Withdrawal failed! Check your transaction{' '}
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

export function showConfirmedWithdraw(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			Withdrawal{' '}
			<a
				target='_blank'
				href={etherscan}
				rel='noreferrer'
				style={{ color: 'white' }}
			>
				completed
			</a>
			! Your tokens are in your wallet.
		</span>,
	)
}