import { getContract, sendAndConfirmTransaction, sendTransaction, waitForReceipt } from 'thirdweb';
import { approve as approveExt } from 'thirdweb/extensions/erc20';
import { totalSupply as totalSupplyByIdExt } from 'thirdweb/extensions/erc1155';
import { Account } from 'thirdweb/wallets';

import {
  asset as assetExt,
  deposit as depositExt,
  scale as scaleExt,
  totalAssets as totalAssetsExt,
  totalSupply as totalSupplyExt,
} from '../thirdweb-codegen/extensions/credbull-v1.3/yield/liquid-continuous-multi-token-vault';
import { Address } from '../utils/address';
import { chain, client, liquidStoneContract } from '../utils/thirdweb-client';

import { totalAssetsByOwner as extTotalAssetsByOwner } from './extensions/read/totalAssetsByOwner';

// ============================== Write ==============================
// TODO - move write operations into a class that has an associated account?  if not, need to pass account/wallet into every function

// Approve asset allowance to the LiquidStone contract, e.g. for a deposit call
// deposit amount is human-readable, for example depositAmount of 10 USDC or 10_000_000 USDC with decimals.
export async function approveAsset(owner: Account, depositAmount: number) {
  try {
    const assetAddress = await asset();

    const assetContract = getContract({
      client: client,
      address: assetAddress,
      chain: chain,
    });

    const approveTxn = approveExt({
      contract: assetContract,
      spender: liquidStoneContract.address,
      amount: depositAmount,
    });

    // sendAndConfirm waits for block to be mined.  ensures approve is done before deposit.
    // see: https://portal.thirdweb.com/typescript/v5/transactions/send
    return sendAndConfirmTransaction({
      account: owner,
      transaction: approveTxn,
    });
  } catch (error) {
    console.error('Error LiquidStone approveAsset:', error);
    throw error;
  }
}

// deposit into LiquidStone.  requires approval on underlying asset prior to deposit (see #approve)
export async function deposit(owner: Account, depositAmount: number, receiver: Address) {
  // scale the deposit to include decimals.  e.g. turn 10 USDC into 10_000_000 USDC with decimals
  const amountScaled = await scaleUp(depositAmount);

  const depositTxn = depositExt({
    contract: liquidStoneContract,
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

export async function asset() {
  return assetExt({
    contract: liquidStoneContract,
  });
}

export async function scale() {
  return scaleExt({
    contract: liquidStoneContract,
  });
}

export async function scaleUp(amount: number) {
  const scaleAmount = await scale();
  const scaledAmount = Math.round(amount * Number(scaleAmount)); // Scale up
  return BigInt(scaledAmount); // Convert the result to BigInt
}

export async function totalSupplyById(liquidStoneTokenId: bigint) {
  return totalSupplyByIdExt({
    contract: liquidStoneContract,
    id: liquidStoneTokenId,
  });
}

export async function totalSupply() {
  return totalSupplyExt({
    contract: liquidStoneContract,
  });
}

export async function totalAssetsByOwner(ownerAddress: string) {
  return extTotalAssetsByOwner({
    contract: liquidStoneContract,
    owner: ownerAddress,
  });
}

export async function totalAssets() {
  return totalAssetsExt({
    contract: liquidStoneContract,
  });
}

async function main() {
  console.log('Starting script...');

  const assets = await totalAssets();
  const supply = await totalSupply();

  console.log(`Total Assets: ${assets.toLocaleString()}`);
  console.log(`Total Supply: ${supply.toLocaleString()}`);

  console.log('Script completed successfully.');
}

// Entry point: handle errors globally
main().catch((err) => {
  console.error('Error in script:', err);
  process.exit(1);
});
