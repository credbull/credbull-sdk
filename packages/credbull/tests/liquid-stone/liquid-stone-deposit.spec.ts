import { expect, test } from '@playwright/test';
import { approve } from '@src/erc20/erc20';
import { asset, credbullClient, deposit, liquidStoneContract } from '@src/liquid-stone/liquid-stone';
import { Address } from '@utils/address';
import { loadConfig } from '@utils/config';

loadConfig();

const userAddress: Address = process.env.USER_ADDRESS as string;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test LiquidStone Deposit & Redeem', () => {
  const depositAmount: number = 0.000001;
  const owner = credbullClient.createAccount(deployerPrivateKey);

  test('Test Deposit', async () => {
    const liquidStoneAsset = await asset();

    // first, approve the deposit
    const approveTxnReceipt = await approve(liquidStoneAsset, liquidStoneContract.address, owner, depositAmount);
    console.log(`Approve Txn Hash: ${approveTxnReceipt.transactionHash}`);
    expect(approveTxnReceipt.status).toBe('success');

    // now, deposit
    const depositTxnReceipt = await deposit(owner, depositAmount, userAddress);
    console.log(`Deposit Txn Hash: ${depositTxnReceipt.transactionHash}`);
    expect(depositTxnReceipt.status).toBe('success');
  });
});
