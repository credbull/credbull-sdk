import { toBigInt } from 'ethers';
import { totalSupply } from 'thirdweb/extensions/erc1155';

import { liquidStoneContract } from './liquid-stone-contract';

async function liquidStoneSupply(liquidStoneTokenId: bigint) {
  const supply = await totalSupply({
    contract: liquidStoneContract,
    id: liquidStoneTokenId,
  });

  console.log(`LiquidStone [${liquidStoneTokenId}] Supply: `, supply);

  return supply;
}

async function main() {
  console.log('Starting script...');

  await liquidStoneSupply(toBigInt(38));

  console.log('Script completed successfully.');
}

// Entry point: handle errors globally
main().catch((err) => {
  console.error('Error in script:', err);
  process.exit(1);
});
