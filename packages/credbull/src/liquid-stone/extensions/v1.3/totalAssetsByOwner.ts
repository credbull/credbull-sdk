import type { AbiParameterToPrimitiveType } from 'abitype';
import { BaseTransactionOptions, readContract } from 'thirdweb';

/**
 * Represents the parameters for the "totalAssets" function.
 */
export type TotalAssetsParams = {
  owner: AbiParameterToPrimitiveType<{ internalType: 'address'; name: 'owner'; type: 'address' }>;
};

export async function totalAssetsByOwner(options: BaseTransactionOptions<TotalAssetsParams>) {
  return readContract({
    contract: options.contract,
    method: 'function totalAssets(address owner) public view returns (uint256 totalManagedAssets)',
    params: [options.owner],
  });
}
