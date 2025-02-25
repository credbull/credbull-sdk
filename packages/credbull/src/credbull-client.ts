import { createThirdwebClient } from 'thirdweb';
import { ThirdwebClient } from 'thirdweb/src/client/client';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { Account } from 'thirdweb/wallets';

import { ChainConfig } from './utils/chain-config';
import { loadConfiguration } from './utils/config';
import { Secret } from './utils/rpc-types';

const envConfig = loadConfiguration();

export class CredbullClient<T extends ChainConfig = ChainConfig> {
  private _chainConfig: T;
  private _thirdWebClient: ThirdwebClient;

  constructor(chainConfig: T, thirdWebClient?: ThirdwebClient) {
    if (!chainConfig) {
      throw Error('Chain config undefined!');
    }

    this._chainConfig = chainConfig;

    this._thirdWebClient = !thirdWebClient ? this.createThirdWebClient() : thirdWebClient;
  }

  get chainConfig(): T {
    return this._chainConfig;
  }

  get thirdWebClient(): ThirdwebClient {
    return this._thirdWebClient;
  }

  createThirdWebClient(): ThirdwebClient {
    const thirdWebKey = envConfig.secret?.thirdwebSecretKey;
    if (!thirdWebKey) {
      throw Error('Third web key required.');
    }

    const client: ThirdwebClient = createThirdwebClient({
      secretKey: thirdWebKey.valueOf(),
    });
    console.log('Initialized ThirdWeb Client: ', client.clientId);
    return client;
  }

  createAccount(privateKey: Secret): Account {
    return privateKeyToAccount({
      client: this._thirdWebClient,
      privateKey: privateKey.valueOf(),
    });
  }
}
