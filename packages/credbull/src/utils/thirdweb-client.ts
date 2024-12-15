import { createThirdwebClient } from 'thirdweb';

import { loadConfig } from './config';

loadConfig();

export const initializeThirdwebClient = () => {
  const client = createThirdwebClient({
    secretKey: process.env.THIRDWEB_SECRET_KEY as string,
  });
  console.log('Initialized ThirdWeb Client: ', client.clientId);
  return client;
};
