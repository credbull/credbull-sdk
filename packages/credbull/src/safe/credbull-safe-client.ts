import { SafeMultisigTransactionListResponse } from '@safe-global/api-kit';
import { SafeProvider } from '@safe-global/protocol-kit';
import { SafeClient, SafeClientResult, createSafeClient } from '@safe-global/sdk-starter-kit';
import { Hex } from 'thirdweb/src/utils/encoding/hex';

import { ChainConfig } from '../utils/chain-config';
import { Address, TransactionHash } from '../utils/rpc-types';

export class CredbullSafeClient<T extends ChainConfig = ChainConfig> {
  private _chainConfig: T;
  private _safeAddress: Address;
  private _safeClient: Promise<SafeClient>;

  constructor(chainConfig: T, safeAddress: Address, safeSigner: SafeProvider['signer'] | undefined) {
    if (!chainConfig) {
      throw Error('Chain config undefined!');
    }
    this._chainConfig = chainConfig;
    this._safeAddress = safeAddress;
    this._safeClient = this.createSafeClient(safeSigner);
  }

  createSafeClient(safeSigner: SafeProvider['signer'] | undefined): Promise<SafeClient> {
    return createSafeClient({
      provider: this._chainConfig.chain.rpc,
      signer: safeSigner,
      safeAddress: this._safeAddress,
    });
  }

  // see https://docs.safe.global/core-api/transaction-service-guides/data-decoder
  // API reference see https://docs.safe.global/core-api/transaction-service-reference/mainnet
  async decodeData(data: string, to?: string) {
    const safeClient = await this._safeClient;

    return safeClient.apiKit.decodeData(data, to);
  }

  // send 1 signer txn https://docs.safe.global/sdk/starter-kit/guides/send-transactions
  deposit(to: Address, amountInWei: string): Promise<SafeClientResult> {
    return this.sendTxn(to, amountInWei, '0x');
  }

  call(to: Address, txnData: Hex): Promise<SafeClientResult> {
    return this.sendTxn(to, '0', txnData);
  }

  // TODO - change amountInWei to be a number type
  async sendTxn(to: Address, amountInWei: string, txnData: Hex): Promise<SafeClientResult> {
    const transactions = [
      {
        to: to,
        value: amountInWei,
        data: txnData,
      },
    ];

    const safeClient = await this._safeClient;

    const txnResult: SafeClientResult = await safeClient.send({
      transactions,
    });

    this.logTxnResult(txnResult);

    return txnResult;
  }

  async confirmTxn(safeTxHash: TransactionHash): Promise<SafeClientResult> {
    const safeClient = await this._safeClient;

    const pendingTransactions: SafeMultisigTransactionListResponse = await this.getPendingTransactions();

    for (const transaction of pendingTransactions.results) {
      if (transaction.safeTxHash !== safeTxHash) {
        console.debug(`Transaction ${transaction.safeTxHash} != ${safeTxHash} .  Skipping.`);
      } else {
        console.log(`Transaction ${safeTxHash} found, confirming!`);
        return safeClient.confirm({ safeTxHash });
      }
    }

    throw Error(`Safe transaction ${safeTxHash} not found!`);
  }

  async getPendingTransactions(): Promise<SafeMultisigTransactionListResponse> {
    return (await this._safeClient).getPendingTransactions();
  }

  logTxnResult(depositTxnResult: SafeClientResult | undefined) {
    console.debug(`Transaction status: ${depositTxnResult?.status}`);
    console.debug(`Transaction safeTxHash: ${depositTxnResult?.transactions?.safeTxHash}`);
    console.debug(`Transaction ethereumTxHash: ${depositTxnResult?.transactions?.ethereumTxHash}`);
  }

  get safeAddress(): Address {
    return this._safeAddress;
  }

  get safeClient(): Promise<SafeClient> {
    return this._safeClient;
  }
}
