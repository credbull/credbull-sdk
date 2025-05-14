import dotenv from 'dotenv';
import path from 'path';

import { Address, Secret } from './rpc-types';

dotenv.config({
  encoding: 'utf-8',
  path: [
    path.resolve(__dirname, '../../.env'), // sdk
  ],
  override: true,
});

interface EnvConfig {
  secret: {
    thirdwebClientId: Secret;
    thirdwebSecretKey: Secret;
    alchemyApiKey: Secret;
    deployerPrivateKey: Secret;
    deployerAltPrivateKey?: Secret;
    userAddress: Address;
    userPrivateKey: Secret;
  };
}

export const loadConfiguration = (): EnvConfig => {
  const secret = {
    thirdwebClientId: new Secret(process.env.THIRDWEB_CLIENT_ID || ''),
    thirdwebSecretKey: new Secret(process.env.THIRDWEB_SECRET_KEY || ''),
    alchemyApiKey: new Secret(process.env.ALCHEMY_API_KEY || ''),
    deployerPrivateKey: new Secret(process.env.DEPLOYER_PRIVATE_KEY || ''),
    deployerAltPrivateKey: new Secret(process.env.DEPLOYER_ALT_PRIVATE_KEY || ''),
    userAddress: process.env.USER_ADDRESS || '',
    userPrivateKey: new Secret(process.env.USER_PRIVATE_KEY || ''),
  };

  return {
    secret,
  };
};

export default { loadConfiguration };
