import { CredbullClient } from '@src/credbull-client';
import { CredbullContract } from '@src/credbull-contract';
import { Address } from '@utils/rpc-types';
import { sendAndConfirmTransaction } from 'thirdweb';
import {
  approve as approveExt,
  balanceOf as balanceOfExt,
  totalSupply as totalSupplyExt,
} from 'thirdweb/extensions/erc20';
import { Account } from 'thirdweb/wallets';

export class ERC20 extends CredbullContract {
  constructor(credbullClient: CredbullClient, erc20Address: Address) {
    super(credbullClient, erc20Address);
  }

  // get the approve Txn.  use directly by thirdweb or encode into Hex to use by (Gnosis) Safe.
  approveTxn(spender: Address, depositAmount: number) {
    return approveExt({
      contract: this._contract,
      spender: spender,
      amount: depositAmount,
    });
  }

  // Approve asset allowance to the LiquidStone contract, e.g. for a deposit call
  // deposit amount is human-readable, for example depositAmount of 10 USDC or 10_000_000 USDC with decimals.
  approve(spender: Address, owner: Account, depositAmount: number) {
    try {
      const txn = this.approveTxn(spender, depositAmount);

      // sendAndConfirm waits for block to be mined.  ensures approve is done before deposit.
      // see: https://portal.thirdweb.com/typescript/v5/transactions/send
      return sendAndConfirmTransaction({
        account: owner,
        transaction: txn,
      });
    } catch (error) {
      console.error('Error LiquidStone approveAsset:', error);
      throw error;
    }
  }

  totalSupply() {
    return totalSupplyExt({
      contract: this._contract,
    });
  }

  balanceOf(address: Address) {
    return balanceOfExt({
      contract: this._contract,
      address: address,
    });
  }
}
