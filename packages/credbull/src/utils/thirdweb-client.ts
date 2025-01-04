import { createThirdwebClient } from 'thirdweb';
import { ThirdwebClient } from 'thirdweb/src/client/client';

import { loadConfig } from './config';

export { chain } from './chain';

loadConfig();

function thirdWebClient(): ThirdwebClient {
  const client: ThirdwebClient = createThirdwebClient({
    secretKey: process.env.THIRDWEB_SECRET_KEY as string,
  });
  console.log('Initialized ThirdWeb Client: ', client.clientId);
  return client;
}

export const client = thirdWebClient();
