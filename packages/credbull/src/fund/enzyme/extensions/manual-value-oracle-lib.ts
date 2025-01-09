import {
  type AbiParameterToPrimitiveType,
  type BaseTransactionOptions,
  prepareContractCall,
  readContract,
} from 'thirdweb';

export async function getUpdater(options: BaseTransactionOptions) {
  return await readContract({
    contract: options.contract,
    method: 'function getUpdater() public view returns (address updater_)',
    params: [],
  });
}

export async function getValue(options: BaseTransactionOptions) {
  return await readContract({
    contract: options.contract,
    method: 'function getValue() public view returns (uint256 updater_)',
    params: [],
  });
}

// TODO - replace with updateValue() ABI
export type CalcNavParams = {
  vaultProxy: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_vaultProxy'; type: 'address' }>;
};

// TODO - replace with updateValue()
export function calcNav(options: BaseTransactionOptions<CalcNavParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x53d467f3',
      [
        {
          internalType: 'address',
          name: '_vaultProxy',
          type: 'address',
        },
      ],
      [
        {
          internalType: 'address',
          name: 'denominationAsset_',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'nav_',
          type: 'uint256',
        },
      ],
    ],
    params: [options.vaultProxy],
  });
}
