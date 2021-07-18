import React from 'react'
import toast from 'react-hot-toast'
import { config, ETHERSCAN } from '../../configuration'

export function showCorrectAnswer(): void {
	toast.success('Correct!', { duration: 2000 })
}

export function showPendingRequest(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.success(
		<span>
			Your NODEdrop is on the way! Check the status{' '}
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

export function showFailedRequest(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	toast.error(
		<span>
			Your{' '}
			<a
				target='_blank'
				href={etherscan}
				rel='noreferrer'
				style={{ color: 'white' }}
			>
				transaction
			</a>{' '}
			failed!
		</span>,
	)
}

export function showConfirmedRequest(network: number, txHash: string): void {
	const etherscan = ETHERSCAN[network] + txHash

	if (network === config.MAINNET_NETWORK_NUMBER) {
		toast.success(
			<span>
				NODEdrop{' '}
				<a
					target='_blank'
					href={etherscan}
					rel='noreferrer'
					style={{ color: 'white' }}
				>
					confirmed
				</a>
				. Go stake your NODE in the dashboard!
			</span>,
		)
	} else if (network === config.XDAI_NETWORK_NUMBER) {
		toast.success(
			<span>
				NODEdrop{' '}
				<a
					target='_blank'
					href={etherscan}
					rel='noreferrer'
					style={{ color: 'white' }}
				>
					confirmed
				</a>
				! Check your NODEstream in the dashboard!
			</span>,
		)
	}
}
