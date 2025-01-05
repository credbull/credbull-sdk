import { CredbullClient } from '@src/credbull-client';
import { Address } from '@utils/rpc-types';
import { sendAndConfirmTransaction } from 'thirdweb';
import { approve as approveExt } from 'thirdweb/extensions/erc20';
import { Account } from 'thirdweb/wallets';

const credbullClient = new CredbullClient(undefined);

// get the approve Txn.  use directly by thirdweb or encode into Hex to use by (Gnosis) Safe.
export async function approveTxn(erc20Address: Address, spender: Address, depositAmount: number) {
  const assetContract = credbullClient.getContract(erc20Address);

  return approveExt({
    contract: assetContract,
    spender: spender,
    amount: depositAmount,
  });
}

// Approve asset allowance to the LiquidStone contract, e.g. for a deposit call
// deposit amount is human-readable, for example depositAmount of 10 USDC or 10_000_000 USDC with decimals.
export async function approve(erc20Address: Address, spender: Address, owner: Account, depositAmount: number) {
  try {
    const txn = await approveTxn(erc20Address, spender, depositAmount);

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
