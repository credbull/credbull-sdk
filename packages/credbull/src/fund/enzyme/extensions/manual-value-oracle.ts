import { CredbullClient } from '@src/credbull-client';
import { CredbullContract } from '@src/credbull-contract';
import { Address } from '@utils/rpc-types';
import {
  type AbiParameterToPrimitiveType,
  type BaseTransactionOptions,
  prepareContractCall,
  readContract,
  sendTransaction,
  waitForReceipt,
} from 'thirdweb';
import { Account } from 'thirdweb/dist/types/exports/wallets';

export type UpdateValueParams = {
  nextValue: AbiParameterToPrimitiveType<{ internalType: 'int192'; name: '_nextValue'; type: 'int192' }>;
};

// manual value oracle proxy and lib
export class ManualValueOracle extends CredbullContract {
  constructor(credbullClient: CredbullClient, erc20Address: Address) {
    super(credbullClient, erc20Address);
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

    try {
      const txnResult = await sendTransaction({
        account: deployer, // the account initiating the transaction
        transaction: txn,
      });

      return waitForReceipt(txnResult);
    } catch (error) {
      console.error('Error sending updateValue transaction:', error);
      throw error;
    }
  }
}
