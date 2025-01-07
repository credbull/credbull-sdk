import { CredbullClient } from '@src/credbull-client';
import { CredbullContract } from '@src/credbull-contract';
import {
  asset as assetExt,
  currentPeriod as currentPeriodExt,
  deposit as depositExt,
  noticePeriod as noticePeriodExt,
  requestRedeem as requestRedeemExt,
  scale as scaleExt,
  totalAssets as totalAssetsExt,
  totalSupply as totalSupplyExt,
  unlockRequests as unlockRequestsExt,
} from '@src/liquid-stone/extensions/v1.3/liquid-stone.codegen';
import { Address } from '@utils/rpc-types';
import { sendTransaction, waitForReceipt } from 'thirdweb';
import { totalSupply as totalSupplyByIdExt } from 'thirdweb/extensions/erc1155';
import { TransactionReceipt } from 'thirdweb/src/transaction/types';
import { Account } from 'thirdweb/wallets';

import { totalAssetsByOwner as extTotalAssetsByOwner } from './extensions/v1.3/totalAssetsByOwner';

export class LiquidStone extends CredbullContract {
  constructor(credbullClient: CredbullClient) {
    super(credbullClient, credbullClient.chainConfig.liquidStone);
  }

  // ============================== Write ==============================
  // TODO - move write operations into a class that has an associated account?  if not, need to pass account/wallet into every function

  // PRE-REQUISITE: requires approval on underlying asset (e.g. USDC) prior to deposit (see #approve)
  async deposit(owner: Account, depositAmount: number, receiver: Address): Promise<TransactionReceipt> {
    // scale the deposit to include decimals.  e.g. turn 10 USDC into 10_000_000 USDC with decimals
    const amountScaled = await this.scaleUp(depositAmount);

    const depositTxn = depositExt({
      contract: this._contract,
      assets: amountScaled,
      receiver: receiver,
      controller: owner.address,
    });

    try {
      const depositTxnResult = await sendTransaction({
        account: owner, // the account initiating the transaction
        transaction: depositTxn,
      });

      return waitForReceipt(depositTxnResult);
    } catch (error) {
      console.error('Error sending deposit transaction:', error);
      throw error;
    }
  }

  async requestRedeem(owner: Account, shares: number): Promise<TransactionReceipt> {
    // scale the deposit to include decimals.  e.g. turn 10 USDC into 10_000_000 USDC with decimals
    const amountScaled = await this.scaleUp(shares);

    const requestRedeemTxn = requestRedeemExt({
      contract: this._contract,
      shares: amountScaled,
      owner: owner.address,
      controller: owner.address,
    });

    try {
      const txnResult = await sendTransaction({
        account: owner, // the account initiating the transaction
        transaction: requestRedeemTxn,
      });

      return waitForReceipt(txnResult);
    } catch (error) {
      console.error('Error sending deposit transaction:', error);
      throw error;
    }
  }

  // ============================== View / Read-only ==============================

  get address(): Address {
    return this._address;
  }

  asset(): Promise<string> {
    return assetExt({
      contract: this._contract,
    });
  }

  currentPeriod(): Promise<bigint> {
    return currentPeriodExt({
      contract: this._contract,
    });
  }

  noticePeriod(): Promise<bigint> {
    return noticePeriodExt({
      contract: this._contract,
    });
  }

  scale(): Promise<bigint> {
    return scaleExt({
      contract: this._contract,
    });
  }

  async scaleUp(amount: number): Promise<bigint> {
    const scaleAmount = await this.scale();
    const scaledAmount = Math.round(amount * Number(scaleAmount)); // Scale up
    return BigInt(scaledAmount); // Convert the result to BigInt
  }

  totalAssets(): Promise<bigint> {
    return totalAssetsExt({
      contract: this._contract,
    });
  }

  totalAssetsByOwner(ownerAddress: string): Promise<bigint> {
    return extTotalAssetsByOwner({
      contract: this._contract,
      owner: ownerAddress,
    });
  }

  totalSupply(): Promise<bigint> {
    return totalSupplyExt({
      contract: this._contract,
    });
  }

  totalSupplyById(depositPeriod: bigint): Promise<bigint> {
    return totalSupplyByIdExt({
      contract: this._contract,
      id: depositPeriod,
    });
  }

  async unlockRequests(ownerAddress: Address, redeemPeriod: bigint) {
    return unlockRequestsExt({
      contract: this._contract,
      owner: ownerAddress,
      requestId: redeemPeriod,
    });
  }
}
