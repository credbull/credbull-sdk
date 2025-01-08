import { CredbullClient } from '@src/credbull-client';
import { CredbullContract } from '@src/credbull-contract';
import {
  asset as assetExt,
  balanceOf as balanceOfExt,
  convertToAssetsForDepositPeriod as convertToAssetsForDepositPeriodExt,
  currentPeriod as currentPeriodExt,
  deposit as depositExt,
  minUnlockPeriod as minUnlockPeriodExt,
  noticePeriod as noticePeriodExt,
  requestRedeem as requestRedeemExt,
  scale as scaleExt,
  totalAssets as totalAssetsExt,
  totalSupply as totalSupplyExt,
  unlockRequests as unlockRequestsExt,
} from '@src/liquid-stone/extensions/v1.3/liquid-stone.codegen';
import { Address } from '@utils/rpc-types';
import { toBigInt } from 'ethers';
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

  balanceOf(owner: Address, depositPeriod: bigint): Promise<bigint> {
    return balanceOfExt({
      contract: this._contract,
      account: owner,
      id: depositPeriod,
    });
  }

  convertToAssets(shares: bigint, depositPeriod: bigint, redeemPeriod: bigint): Promise<bigint> {
    return convertToAssetsForDepositPeriodExt({
      contract: this._contract,
      shares,
      depositPeriod,
      redeemPeriod,
    });
  }

  currentPeriod(): Promise<bigint> {
    return currentPeriodExt({
      contract: this._contract,
    });
  }

  minUnlockPeriod(): Promise<bigint> {
    return minUnlockPeriodExt({
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

  // return all shares for the owner (e.g. all holdings across all ERC1155 positions utp to the deposit period)
  async shares(ownerAddress: Address): Promise<{ depositPeriods: bigint[]; shares: bigint[] }> {
    const currentPeriod = Number(await this.currentPeriod());

    const depositPeriods: bigint[] = [];
    const shares: bigint[] = [];

    for (let depositPeriod = 0; depositPeriod <= currentPeriod; depositPeriod++) {
      const sharesAtPeriod = await this.balanceOf(ownerAddress, toBigInt(depositPeriod)); // Convert depositPeriod back to bigint

      if (sharesAtPeriod > toBigInt(0)) {
        depositPeriods.push(toBigInt(depositPeriod)); // Store as bigint
        shares.push(sharesAtPeriod);
      }
    }

    return { depositPeriods, shares };
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

  totalAssetsByOwner(ownerAddress: Address): Promise<bigint> {
    return extTotalAssetsByOwner({
      contract: this._contract,
      owner: ownerAddress,
    });
  }

  async totalSharesByOwner(ownerAddress: Address): Promise<bigint> {
    const allShares: { depositPeriods: bigint[]; shares: bigint[] } = await this.shares(ownerAddress);
    return allShares.shares.reduce((acc, share) => acc + share, BigInt(0));
  }

  // calculate the shares to invest (calculate deposits - requested redeems)
  async depositSharesToInvest(ownerAddress: Address, depositPeriod: bigint) {
    // totalSupply(id) returns shares, but at deposit period shares = assets
    const depositAmount: bigint = await this.totalSupplyById(depositPeriod);

    const redeemPeriod = depositPeriod + (await this.noticePeriod());
    const totalRedeemAmount = await this.totalRedeemAssetAmount(ownerAddress, redeemPeriod);

    return depositAmount - totalRedeemAmount;
  }

  async totalRedeemAssetAmount(ownerAddress: Address, redeemPeriod: bigint) {
    // TODO - need to loop through all depositors or use a user-agnostic function
    const unlockRequests: { depositPeriods: bigint[]; amounts: bigint[] } = await this.unlockRequests(
      ownerAddress,
      redeemPeriod,
    );

    let totalRedeemAmount = toBigInt(0);
    for (const [index, depositPeriod] of unlockRequests.depositPeriods.entries()) {
      const redeemSharesAtPeriod = unlockRequests.amounts[index];
      const redeemAmountsAtPeriod = await this.convertToAssets(redeemSharesAtPeriod, depositPeriod, redeemPeriod);
      totalRedeemAmount += redeemAmountsAtPeriod;
    }
    return totalRedeemAmount;
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

  async unlockRequests(
    ownerAddress: Address,
    redeemPeriod: bigint,
  ): Promise<{ depositPeriods: bigint[]; amounts: bigint[] }> {
    const [readonlyDepositPeriods, readonlyAmounts]: readonly [readonly bigint[], readonly bigint[]] =
      await unlockRequestsExt({
        contract: this._contract,
        owner: ownerAddress,
        requestId: redeemPeriod,
      });

    const depositPeriods = [...readonlyDepositPeriods];
    const amounts = [...readonlyAmounts];

    return { depositPeriods, amounts };
  }
}
