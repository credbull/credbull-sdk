import { Abi } from 'abitype';
import { ThirdwebContract, getContract } from 'thirdweb';

import { CredbullClient } from './credbull-client';
import { Address } from './utils/rpc-types';

export class CredbullContract<abiType extends Abi = Abi> {
  protected _credbullClient: CredbullClient;
  protected _address: Address;
  protected _contract: ThirdwebContract<abiType>;
  protected _abi?: abiType;

  constructor(credbullClient: CredbullClient, address: Address, abi?: abiType) {
    if (!credbullClient) {
      throw new Error('CredbullClient is undefined!');
    }
    if (!address) {
      throw new Error('Contract address is undefined!');
    }

    this._credbullClient = credbullClient;
    this._address = address;
    this._abi = abi;

    this._contract = getContract<abiType>({
      client: this._credbullClient.thirdWebClient,
      address: this._address,
      chain: this._credbullClient.chainConfig.chain,
      abi: this._abi,
    });
  }

  get credbullClient(): CredbullClient {
    return this._credbullClient;
  }

  get address(): Address {
    return this._address;
  }

  get contract(): ThirdwebContract<abiType> {
    return this._contract;
  }
}
