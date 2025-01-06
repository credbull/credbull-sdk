import { CredbullClient } from '@src/credbull-client';
import { Address } from '@utils/rpc-types';
import { ThirdwebContract, getContract } from 'thirdweb';

export class CredbullContract {
  protected _credbullClient: CredbullClient;
  protected _address: Address;
  protected _contract: ThirdwebContract;

  constructor(credbullClient: CredbullClient, address: Address) {
    if (!credbullClient) {
      throw new Error('CredbullClient is undefined!');
    }
    if (!address) {
      throw new Error('Contract address is undefined!');
    }

    this._credbullClient = credbullClient;
    this._address = address;
    this._contract = this.getContract(this._address);
  }

  get credbullClient(): CredbullClient {
    return this._credbullClient;
  }

  get address(): Address {
    return this._address;
  }

  get contract(): ThirdwebContract {
    return this._contract;
  }

  private getContract(contractAddress: Address): ThirdwebContract {
    return getContract({
      client: this._credbullClient.thirdWebClient,
      address: contractAddress,
      chain: this._credbullClient.chainConfig.chain,
    });
  }
}
