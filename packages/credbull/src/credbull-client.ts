import { createThirdwebClient } from 'thirdweb';
import { ThirdwebClient } from 'thirdweb/src/client/client';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { Account } from 'thirdweb/wallets';

import { ChainConfig } from './utils/chain-config';
import { loadConfig } from './utils/config';

loadConfig();

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
    const thirdWebKey = process.env.THIRDWEB_SECRET_KEY;
    if (!thirdWebKey) {
      throw Error('Third web key required.');
    }

    const client: ThirdwebClient = createThirdwebClient({
      secretKey: thirdWebKey,
    });
    console.log('Initialized ThirdWeb Client: ', client.clientId);
    return client;
  }

  createAccount(privateKey: string): Account {
    return privateKeyToAccount({
      client: this._thirdWebClient,
      privateKey: privateKey,
    });
  }
}
