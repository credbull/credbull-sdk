import { SafeClient } from '@safe-global/sdk-starter-kit';

import { Address } from '../utils/address';
import { loadConfig } from '../utils/config';

loadConfig();

// send 1 signer txn https://docs.safe.global/sdk/starter-kit/guides/send-transactions
export async function safeDeposit(safeClient: SafeClient, to: Address, amountInWei: string) {
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
