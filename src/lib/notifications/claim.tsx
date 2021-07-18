import React from 'react'
import toast from 'react-hot-toast'
import { ETHERSCAN } from '../../configuration'

export function showPendingClaim(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			Claim submitted! Check the status{' '}
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

export function showFailedClaim(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.error(
		<span>
			Your claim failed! Check your transaction{' '}
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

export function showConfirmedClaim(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			<a
				target='_blank'
				href={etherscan}
				rel='noreferrer'
				style={{ color: 'white' }}
			>
				Claimed
			</a>
			! Your NODE tokens are in your wallet.
		</span>,
	)
}
