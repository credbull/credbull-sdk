import { createThirdwebClient, getContract } from 'thirdweb';
import { arbitrumSepolia } from 'thirdweb/chains';
import { ThirdwebClient } from 'thirdweb/src/client/client';

import { loadConfig } from './config';

loadConfig();

function thirdWebClient(): ThirdwebClient {
  const client: ThirdwebClient = createThirdwebClient({
    secretKey: process.env.THIRDWEB_SECRET_KEY as string,
  });
  console.log('Initialized ThirdWeb Client: ', client.clientId);
  return client;
}

export const chain = arbitrumSepolia;
export const client = thirdWebClient();

export const liquidStoneContract = getContract({
  client: client,
  address: process.env.CREDBULL_LIQUIDSTONE_ADDRESS as string,
  chain: chain,
});
