import { createThirdwebClient } from 'thirdweb';
import { ThirdwebClient } from 'thirdweb/src/client/client';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { Account } from 'thirdweb/wallets';

import { ChainConfig } from './utils/chain-config';
import { loadConfig } from './utils/config';

loadConfig();

export class CredbullClient {
  private _chainConfig: ChainConfig;
  private _thirdWebClient;

  constructor(chainConfig: ChainConfig) {
    if (!chainConfig) {
      throw Error('Chain config undefined!');
    }

    this._chainConfig = chainConfig;
    this._thirdWebClient = this.createThirdWebClient();
  }

  get chainConfig(): ChainConfig {
    return this._chainConfig;
  }

  get thirdWebClient() {
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
