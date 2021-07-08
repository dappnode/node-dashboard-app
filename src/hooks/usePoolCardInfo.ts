export function usePoolCardInfo() {
	const poolsInfo = {
		'NODE/xDAI': {
			name: 'Uniswap',
			provideLiquidity:
				'https://app.uniswap.org/#/add/v2/ETH/0xa2444c16F93d7319B2D2667140B41F8f2541A80e',
			composition: '50% NODE, 50% ETH',
			stakePoolInfo: {
				tokensInPool: '-',
				tokensInPoolUSD: '-',
				lpTokens: 0,
				APR: '-',
				earned: { amount: 0, token: 'DN' },
			},
			userStakeInfo: null,
		},
		'NODE/HNY': {
			name: 'Balancer',
			provideLiquidity: '',
			composition: '50% NODE, 50% ETH',
			stakePoolInfo: {
				tokensInPool: '1532 DN, 0.23 ETH',
				tokensInPoolUSD: '(1400.65 USD)',
				lpTokens: 56,
				APR: '148.55%',
				earned: { amount: 900, token: 'DN' },
			},
			userStakeInfo: null,
		},
		NODE: {
			name: 'NODE Staking',
			composition: '100% NODE',
			provideLiquidity: '',
			stakePoolInfo: {
				tokensInPool: '1532 DN, 0.23 ETH',
				tokensInPoolUSD: '(1400.65 USD)',
				lpTokens: 56,
				APR: '148.55%',
				earned: { amount: 900, token: 'DN' },
			},
			userStakeInfo: null,
		},
	}

	return {
		poolsInfo,
	}
}
