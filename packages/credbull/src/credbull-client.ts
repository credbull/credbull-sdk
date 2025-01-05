import { loadConfig } from '@utils/config';
import { Address } from '@utils/rpc-types';
import { createThirdwebClient, getContract } from 'thirdweb';
import { ChainOptions, arbitrumSepolia } from 'thirdweb/chains';
import { ThirdwebClient } from 'thirdweb/src/client/client';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { Account } from 'thirdweb/wallets';

loadConfig();

export class CredbullClient {
  private _chain: Readonly<ChainOptions & { rpc: string }>;
  private _thirdWebClient;

  constructor(chain: Readonly<ChainOptions & { rpc: string }> | undefined) {
    if (!chain) {
      chain = arbitrumSepolia;
    }
    this._chain = chain;
    this._thirdWebClient = this.createThirdWebClient();
  }

  get chain(): Readonly<ChainOptions & { rpc: string }> {
    return this._chain;
  }

  get thirdWebClient() {
    return this._thirdWebClient;
  }

  getContract(contractAddress: Address) {
    return getContract({
      client: this._thirdWebClient,
      address: contractAddress,
      chain: this._chain,
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
