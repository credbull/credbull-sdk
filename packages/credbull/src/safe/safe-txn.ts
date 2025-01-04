import { SafeClient, SafeClientResult } from '@safe-global/sdk-starter-kit';
import { Address, TransactionHash } from '@utils/address';
import { loadConfig } from '@utils/config';
import { Hex } from 'thirdweb/src/utils/encoding/hex';

loadConfig();

// send 1 signer txn https://docs.safe.global/sdk/starter-kit/guides/send-transactions
export async function deposit(safeClient: SafeClient, to: Address, amountInWei: string) {
  const transactions = [
    {
      to,
      value: amountInWei, // 1 wei
      data: '0x', // Optional: calldata for contract interaction
    },
  ];

  return safeClient.send({
    transactions,
  });
}

export async function sendTxn(safeClient: SafeClient, to: Address, txnData: Hex) {
  const transactions = [
    {
      to: to,
      value: '0',
      data: txnData,
    },
  ];

  const txnResult: SafeClientResult = await safeClient.send({
    transactions,
  });

  logTxnResult(txnResult);

  return txnResult;
}

export async function confirmTxn(safeClient: SafeClient, safeTxHash: TransactionHash) {
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

export function logTxnResult(depositTxnResult: SafeClientResult | undefined) {
  console.debug(`Transaction status: ${depositTxnResult?.status}`);
  console.debug(`Transaction safeTxHash: ${depositTxnResult?.transactions?.safeTxHash}`);
  console.debug(`Transaction ethereumTxHash: ${depositTxnResult?.transactions?.ethereumTxHash}`);
}
