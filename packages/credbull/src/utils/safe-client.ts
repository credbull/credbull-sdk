import { SafeClient, SafeClientResult, createSafeClient } from '@safe-global/sdk-starter-kit';
import { baseSepolia } from 'thirdweb/chains';

import { Address, TransactionHash } from './address';
import { loadConfig } from './config';

loadConfig();

export const chain = baseSepolia;

export async function connectSafe(safeAddress: Address, signerPrivateKey: string): Promise<SafeClient> {
  return await createSafeClient({
    provider: chain.rpc,
    signer: signerPrivateKey,
    safeAddress: safeAddress,
  });
}

export async function confirmSafeTxn(safeClient: SafeClient, safeTxHash: TransactionHash) {
  const pendingTransactions = await safeClient.getPendingTransactions();

  for (const transaction of pendingTransactions.results) {
    // do nothing if not the right txn
    if (transaction.safeTxHash !== safeTxHash) {
      console.log(`Transaction ${transaction.safeTxHash} != ${safeTxHash} .  Skipping.`);
    } else {
      console.log(`Transaction ${safeTxHash} found, confirming!`);
      return safeClient.confirm({ safeTxHash });
    }
  }
}

export function log(depositTxnResult: SafeClientResult | undefined) {
  console.log(`Transaction status: ${depositTxnResult?.status}`);
  console.log(`Transaction safeTxHash: ${depositTxnResult?.transactions?.safeTxHash}`);
  console.log(`Transaction ethereumTxHash: ${depositTxnResult?.transactions?.ethereumTxHash}`);
}
