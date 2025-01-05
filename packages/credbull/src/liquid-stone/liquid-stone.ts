import {
  asset as assetExt,
  deposit as depositExt,
  scale as scaleExt,
  totalAssets as totalAssetsExt,
  totalSupply as totalSupplyExt,
} from '@src/liquid-stone/extensions/v1.3/liquid-stone-generated';
import { Address } from '@utils/address';
import { CredbullClient } from '@utils/credbull-client';
import { sendTransaction, waitForReceipt } from 'thirdweb';
import { totalSupply as totalSupplyByIdExt } from 'thirdweb/extensions/erc1155';
import { Account } from 'thirdweb/wallets';

import { totalAssetsByOwner as extTotalAssetsByOwner } from './extensions/v1.3/totalAssetsByOwner';

export const credbullClient = new CredbullClient(undefined);

export const liquidStoneContract = credbullClient.getContract(process.env.CREDBULL_LIQUIDSTONE_ADDRESS as string);

// ============================== Write ==============================
// TODO - move write operations into a class that has an associated account?  if not, need to pass account/wallet into every function

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
