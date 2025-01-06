import { expect, test } from '@playwright/test';
import { CredbullClient } from '@src/credbull-client';
import { ERC20 } from '@src/erc20/erc20';
import { LiquidStone } from '@src/liquid-stone/liquid-stone';
import { testnetConfig } from '@utils/chain-config';
import { loadConfig } from '@utils/config';
import { Address } from '@utils/rpc-types';

loadConfig();

const userAddress: Address = process.env.USER_ADDRESS as string;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test LiquidStone Deposit & Redeem', () => {
  const depositAmount: number = 0.000001;
  const credbullClient = new CredbullClient(testnetConfig);
  const liquidStone: LiquidStone = new LiquidStone(credbullClient);
  const erc20: ERC20 = new ERC20(credbullClient);

  const owner = credbullClient.createAccount(deployerPrivateKey);

  test('Test Deposit', async () => {
    const liquidStoneAsset = await liquidStone.asset();

    // first, approve the deposit
    const approveTxnReceipt = await erc20.approve(liquidStoneAsset, liquidStone.address, owner, depositAmount);
    console.log(`Approve Txn Hash: ${approveTxnReceipt.transactionHash}`);
    expect(approveTxnReceipt.status).toBe('success');

    // now, deposit
    const depositTxnReceipt = await liquidStone.deposit(owner, depositAmount, userAddress);
    console.log(`Deposit Txn Hash: ${depositTxnReceipt.transactionHash}`);
    expect(depositTxnReceipt.status).toBe('success');
  });
});
