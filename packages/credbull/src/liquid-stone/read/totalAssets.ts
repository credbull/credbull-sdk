import type { AbiParameterToPrimitiveType } from 'abitype';
import { BaseTransactionOptions, readContract } from 'thirdweb';

/**
 * Represents the parameters for the "totalAssets" function.
 */
export type TotalAssetsParams = {
  owner: AbiParameterToPrimitiveType<{ type: 'address'; name: 'owner' }>;
};

export const FN_SELECTOR = '0xf3e0ffbf' as const; // 4-byte selector for totalAssets(address)
const FN_INPUTS = [
  {
    type: 'address',
    name: 'owner',
  },
] as const;

const FN_OUTPUTS = [
  {
    type: 'uint256',
    name: 'totalManagedAssets',
  },
] as const;

/**
 * Calls the "totalAssets" function on the contract.
 * @param options - The options for the totalAssets function.
 * @returns The parsed result of the function call.
 * @example
 * ```ts
 * import { totalAssets } from "your/path";
 *
 * const result = await totalAssets({
 *  contract,
 *  owner: "0xOwnerAddress",
 * });
 * ```
 */
export async function totalAssets(options: BaseTransactionOptions<TotalAssetsParams>) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: [options.owner],
  });
}
