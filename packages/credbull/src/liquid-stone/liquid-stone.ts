import { toBigInt } from 'ethers';
import { totalSupply } from 'thirdweb/extensions/erc1155';

import { liquidStoneContract } from '../utils/thirdweb-client';

import { totalAssets } from './read/totalAssets';

// TODO - connect to Plume mainnet (custom RPC)
// TODO - script out runbook deposits vs. redemptions

export async function getTotalSupply(liquidStoneTokenId: bigint) {
  const supply = await totalSupply({
    contract: liquidStoneContract,
    id: liquidStoneTokenId,
  });

  console.log(`LiquidStone [${liquidStoneTokenId}] Supply: `, supply);

  return supply;
}

export async function getTotalAssets(ownerAddress: string) {
  const assets = await totalAssets({
    contract: liquidStoneContract,
    owner: ownerAddress,
  });

  console.log(`Total assets for owner [${ownerAddress}]: `, assets);

  return assets;
}

async function main() {
  console.log('Starting script...');

  await getTotalSupply(toBigInt(38));

  console.log('Script completed successfully.');
}

// Entry point: handle errors globally
main().catch((err) => {
  console.error('Error in script:', err);
  process.exit(1);
});
