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
  // TODO - change the strings to a secret type to override toString()
  secret?: {
    thirdwebSecretKey: Secret;
    deployerPrivateKey: Secret;
    deployerAltPrivateKey?: Secret;
    userAddress: Address;
    userPrivateKey: Secret;
  };
}

export const loadConfiguration = (): EnvConfig => {
  const envConfig: EnvConfig = {};

  envConfig.secret = {
    thirdwebSecretKey: new Secret(process.env.THIRDWEB_SECRET_KEY || ''),
    deployerPrivateKey: new Secret(process.env.DEPLOYER_PRIVATE_KEY || ''),
    deployerAltPrivateKey: new Secret(process.env.DEPLOYER_ALT_PRIVATE_KEY || ''),
    userAddress: process.env.USER_ADDRESS || '',
    userPrivateKey: new Secret(process.env.USER_PRIVATE_KEY || ''),
  };

  return envConfig;
};

export default { loadConfiguration };
