import React from 'react'
import toast from 'react-hot-toast'
import { ETHERSCAN } from '../../configuration'

export function showPendingHarvest(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			Harvest submitted! Check the status{' '}
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

export function showFailedHarvest(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.error(
		<span>
			Your harvest failed! Check your transaction{' '}
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

export function showConfirmedHarvest(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			<a
				target='_blank'
				href={etherscan}
				rel='noreferrer'
				style={{ color: 'white' }}
			>
				Harvested
			</a>
			! Part of your tokens are in your wallet and part in your
			NODEstream.
		</span>,
	)
}
