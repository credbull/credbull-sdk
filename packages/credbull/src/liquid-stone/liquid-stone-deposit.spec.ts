import { expect, test } from '@playwright/test';
import { Account, privateKeyToAccount } from 'thirdweb/wallets';

import { Address } from '../utils/address';
import { loadConfig } from '../utils/config';
import { client } from '../utils/thirdweb-client';

import { approveAsset, deposit } from './liquid-stone';

loadConfig();

const userAddress: Address = process.env.USER_ADDRESS as string;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test LiquidStone Deposit & Redeem', () => {
  const depositAmount: number = 0.000001;
  const owner: Account = privateKeyToAccount({
    client,
    privateKey: deployerPrivateKey,
  });

  test('Test Approve Allowance', async () => {
    const approveTxnReceipt = await approveAsset(owner, depositAmount);
    console.log(`Approve Txn Hash: ${approveTxnReceipt.transactionHash}`);
    expect(approveTxnReceipt.status).toBe('success');
  });

  // owner: Account, depositAmount: number, receiver: Address
  test('Test deposit', async () => {
    const depositTxnReceipt = await deposit(owner, depositAmount, userAddress);
    console.log(`Deposit Txn Hash: ${depositTxnReceipt.transactionHash}`);
    expect(depositTxnReceipt.status).toBe('success');
  });
});
