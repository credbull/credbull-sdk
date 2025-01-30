import type { Abi } from 'abitype';

export const redeemOptimizerErrors: Abi = [
  { inputs: [], name: 'MathOverflowedMulDiv', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'toPeriod', type: 'uint256' },
      { internalType: 'uint256', name: 'currentPeriod', type: 'uint256' },
    ],
    name: 'RedeemOptimizer__FutureToDepositPeriod',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'fromPeriod', type: 'uint256' },
      { internalType: 'uint256', name: 'toPeriod', type: 'uint256' },
    ],
    name: 'RedeemOptimizer__InvalidDepositPeriodRange',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amountFound', type: 'uint256' },
      { internalType: 'uint256', name: 'amountToFind', type: 'uint256' },
    ],
    name: 'RedeemOptimizer__OptimizerFailed',
    type: 'error',
  },
];

export const redeemOptimizerFunctions: Abi = [
  {
    inputs: [
      { internalType: 'enum IRedeemOptimizer.OptimizerBasis', name: 'defaultBasis', type: 'uint8' },
      { internalType: 'uint256', name: 'startDepositPeriod', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'DEFAULT_BASIS',
    outputs: [{ internalType: 'enum IRedeemOptimizer.OptimizerBasis', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'START_DEPOSIT_PERIOD',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IMultiTokenVault', name: 'vault', type: 'address' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'shares', type: 'uint256' },
      { internalType: 'uint256', name: 'assets', type: 'uint256' },
      { internalType: 'uint256', name: 'redeemPeriod', type: 'uint256' },
    ],
    name: 'optimize',
    outputs: [
      { internalType: 'uint256[]', name: 'depositPeriods_', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'sharesAtPeriods_', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IMultiTokenVault', name: 'vault', type: 'address' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'shares', type: 'uint256' },
      { internalType: 'uint256', name: 'redeemPeriod', type: 'uint256' },
    ],
    name: 'optimizeRedeemShares',
    outputs: [
      { internalType: 'uint256[]', name: 'depositPeriods_', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'sharesAtPeriods_', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'contract IMultiTokenVault', name: 'vault', type: 'address' },
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'assets', type: 'uint256' },
      { internalType: 'uint256', name: 'redeemPeriod', type: 'uint256' },
    ],
    name: 'optimizeWithdrawAssets',
    outputs: [
      { internalType: 'uint256[]', name: 'depositPeriods', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'sharesAtPeriods', type: 'uint256[]' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const redeemOptimizerAbi: Abi = [...redeemOptimizerErrors, ...redeemOptimizerFunctions];
