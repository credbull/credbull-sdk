import { CredbullClient } from '@src/credbull-client';
import { CredbullContract } from '@src/credbull-contract';
import {
  asset as assetExt,
  deposit as depositExt,
  scale as scaleExt,
  totalAssets as totalAssetsExt,
  totalSupply as totalSupplyExt,
} from '@src/liquid-stone/extensions/v1.3/liquid-stone.codegen';
import { Address } from '@utils/rpc-types';
import { sendTransaction, waitForReceipt } from 'thirdweb';
import { totalSupply as totalSupplyByIdExt } from 'thirdweb/extensions/erc1155';
import { Account } from 'thirdweb/wallets';

import { totalAssetsByOwner as extTotalAssetsByOwner } from './extensions/v1.3/totalAssetsByOwner';

export class LiquidStone extends CredbullContract {
  constructor(credbullClient: CredbullClient) {
    super(credbullClient, credbullClient.chainConfig.liquidStone);
  }

  // ============================== Write ==============================
  // TODO - move write operations into a class that has an associated account?  if not, need to pass account/wallet into every function

  // deposit into LiquidStone.  requires approval on underlying asset prior to deposit (see #approve)
  async deposit(owner: Account, depositAmount: number, receiver: Address) {
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

  // ============================== View / Read-only ==============================

  get address(): Address {
    return this._address;
  }

  asset() {
    return assetExt({
      contract: this._contract,
    });
  }

  scale() {
    return scaleExt({
      contract: this._contract,
    });
  }

  async scaleUp(amount: number) {
    const scaleAmount = await this.scale();
    const scaledAmount = Math.round(amount * Number(scaleAmount)); // Scale up
    return BigInt(scaledAmount); // Convert the result to BigInt
  }

  totalSupplyById(liquidStoneTokenId: bigint) {
    return totalSupplyByIdExt({
      contract: this._contract,
      id: liquidStoneTokenId,
    });
  }

  totalSupply() {
    return totalSupplyExt({
      contract: this._contract,
    });
  }

  totalAssetsByOwner(ownerAddress: string) {
    return extTotalAssetsByOwner({
      contract: this._contract,
      owner: ownerAddress,
    });
  }

  totalAssets() {
    return totalAssetsExt({
      contract: this._contract,
    });
  }
}
