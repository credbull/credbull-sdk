import { toBigInt } from 'ethers';
import { getContract } from 'thirdweb';
import { arbitrumSepolia } from 'thirdweb/chains';
import { totalSupply } from 'thirdweb/extensions/erc1155';

import { loadConfig } from '../utils/config';
import { initializeThirdwebClient } from '../utils/thirdweb-client';

loadConfig();

const main = async () => {
  const client = initializeThirdwebClient();

  const liquidStoneContract = getContract({
    client,
    address: process.env.CREDBULL_LIQUIDSTONE_ADDRESS as string,
    chain: arbitrumSepolia,
  });

  const liquidStoneTokenId = toBigInt(38);
  const liquidStoneSupply = await totalSupply({
    contract: liquidStoneContract,
    id: liquidStoneTokenId,
  });

  console.log(`LiquidStone [${liquidStoneTokenId}] Supply: `, liquidStoneSupply);
};

main().catch((err) => {
  console.error('Error in script:', err);
  process.exit(1);
});
