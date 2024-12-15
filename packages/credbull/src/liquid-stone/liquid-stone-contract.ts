import { getContract } from 'thirdweb';
import { arbitrumSepolia } from 'thirdweb/chains';

import { loadConfig } from '../utils/config';
import { initializeThirdwebClient } from '../utils/thirdweb-client';

loadConfig();

const client = initializeThirdwebClient();

export const liquidStoneContract = getContract({
  client,
  address: process.env.CREDBULL_LIQUIDSTONE_ADDRESS as string,
  chain: arbitrumSepolia,
});
