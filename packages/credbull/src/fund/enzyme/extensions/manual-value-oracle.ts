import {
  type AbiParameterToPrimitiveType,
  type BaseTransactionOptions,
  Chain,
  ThirdwebContract,
  prepareContractCall,
  readContract,
  sendTransaction,
  waitForReceipt,
} from 'thirdweb';
import { Account } from 'thirdweb/dist/types/exports/wallets';
import { StaticPrepareTransactionOptions } from 'thirdweb/dist/types/transaction/prepare-transaction';
import { PreparedMethod } from 'thirdweb/dist/types/utils/abi/prepare-method';
import { PromisedObject } from 'thirdweb/dist/types/utils/promise/resolve-promised-value';
import { ThirdwebClient } from 'thirdweb/src/client/client';

import { CredbullClient } from '../../../credbull-client';
import { CredbullContract } from '../../../credbull-contract';
import { Address } from '../../../utils/rpc-types';

type UpdateValueParams = {
  nextValue: AbiParameterToPrimitiveType<{ internalType: 'int192'; name: '_nextValue'; type: 'int192' }>;
};

type SetUpdaterParams = {
  nextUpdater: AbiParameterToPrimitiveType<{ internalType: 'address'; name: '_nextUpdater'; type: 'address' }>;
};

// manual value oracle proxy and lib
export class ManualValueOracle extends CredbullContract {
  constructor(credbullClient: CredbullClient, erc20Address: Address) {
    super(credbullClient, erc20Address);
  }

  getNominatedOwner() {
    return readContract({
      contract: this._contract,
      method: 'function getNominatedOwner() public view returns (address nominatedOwner_)',
      params: [],
    });
  }

  getOwner() {
    return readContract({
      contract: this._contract,
      method: 'function getOwner() public view returns (address owner_)',
      params: [],
    });
  }

  getUpdater() {
    return readContract({
      contract: this._contract,
      method: 'function getUpdater() public view returns (address updater_)',
      params: [],
    });
  }

  getValue() {
    return readContract({
      contract: this._contract,
      method: 'function getValue() public view returns (uint256 updater_)',
      params: [],
    });
  }

  private setUpdaterTxn(options: BaseTransactionOptions<SetUpdaterParams>) {
    return prepareContractCall({
      contract: options.contract,
      method: 'function setUpdater(address _nextUpdater)',
      params: [options.nextUpdater],
    });
  }

  async setUpdater(deployer: Account, nextUpdater: Address) {
    const txn = this.setUpdaterTxn({
      contract: this._contract,
      nextUpdater,
    });

    return await this.sendTxn(deployer, txn);
  }

  private updateValueTxn(options: BaseTransactionOptions<UpdateValueParams>) {
    return prepareContractCall({
      contract: options.contract,
      method: 'function updateValue(int192 _nextValue)',
      params: [options.nextValue],
    });
  }

  async updateValue(deployer: Account, newValue: bigint) {
    const txn = this.updateValueTxn({
      contract: this._contract,
      nextValue: newValue,
    });
    return await this.sendTxn(deployer, txn);
  }

  private async sendTxn(
    deployer: Account,
    txn: Readonly<
      {
        chain: Chain;
        client: ThirdwebClient;
      } & PromisedObject<Omit<StaticPrepareTransactionOptions, 'chain' | 'client'>>
    > & {
      __preparedMethod?: () => Promise<PreparedMethod<any>>;
      __contract?: ThirdwebContract<any>;
    },
  ) {
    try {
      const txnResult = await sendTransaction({
        account: deployer, // the account initiating the transaction
        transaction: txn,
      });

      return waitForReceipt(txnResult);
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }
}
