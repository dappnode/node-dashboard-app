export function usePoolCardInfo() {
	const poolsInfo = {
		'NODE/xDAI': {
			name: 'Uniswap',
			provideLiquidity: '',
			composition: '50% NODE, 50% ETH',
			stakePoolInfo: {
				tokensInPool: '-',
				tokensInPoolUSD: '-',
				stakedLpTokens: 0,
				notStakedLPTokens: 0,
				allowance: 0,
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
				stakedLpTokens: 56,
				notStakedLPTokens: 0,
				allowance: 0,
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
				stakedLpTokens: 56,
				notStakedLPTokens: 0,
				allowance: 0,
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
