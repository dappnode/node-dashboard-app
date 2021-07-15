import React from 'react'
import toast from 'react-hot-toast'

const etherscanLinks = {
	4: 'https://rinkeby.etherscan.io/tx/',
	5: 'https://goerli.etherscan.io/tx/',
}

export function showConfirmedClaim(): void {
	toast.success('Your last transaction just confirmed!')
}

export function showConfirmedStake(): void {
	toast.success('You are now generating rewards!')
}

export function showPendingStake(amount: string): void {
	toast.success(`You staked ${amount} tokens!`)
}

export function showPendingClaim(network: number, txHash: string): void {
	const etherscan = etherscanLinks[network] + txHash

	toast.success(
		<span>
			You claimed your reward! Check the status of your transaction{' '}
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