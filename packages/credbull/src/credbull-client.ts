import { ChainConfig } from '@utils/chain-config';
import { loadConfig } from '@utils/config';
import { Address } from '@utils/rpc-types';
import { createThirdwebClient, getContract } from 'thirdweb';
import { ThirdwebClient } from 'thirdweb/src/client/client';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { Account } from 'thirdweb/wallets';

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

  getContract(contractAddress: Address) {
    return getContract({
      client: this._thirdWebClient,
      address: contractAddress,
      chain: this._chainConfig.chain,
    });
  }

  createThirdWebClient(): ThirdwebClient {
    const client: ThirdwebClient = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY as string,
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
