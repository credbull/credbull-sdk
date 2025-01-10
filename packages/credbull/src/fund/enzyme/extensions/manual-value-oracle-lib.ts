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

export type UpdateValueParams = {
  nextValue: AbiParameterToPrimitiveType<{ internalType: 'int192'; name: '_nextValue'; type: 'int192' }>;
};

export function updateValueTxn(options: BaseTransactionOptions<UpdateValueParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: 'function updateValue(int192 _nextValue)',
    params: [options.nextValue],
  });
}
