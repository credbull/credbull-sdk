import { expect, test } from '@playwright/test';
import { CredbullClient } from '@src/credbull-client';
import { ERC20 } from '@src/erc20/erc20';
import { LiquidStone } from '@src/liquid-stone/liquid-stone';
import { testnetConfig } from '@utils/chain-config';
import { loadConfig } from '@utils/config';
import { Address } from '@utils/rpc-types';
import { simulateTransaction } from 'thirdweb';

loadConfig();

const userAddress: Address = process.env.USER_ADDRESS as string;
const userPrivateKey: Address = process.env.USER_PRIVATE_KEY as string;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test LiquidStone Deposit & Redeem', () => {
  const depositAmount: number = 0.000001;
  const credbullClient = new CredbullClient(testnetConfig);
  const liquidStone: LiquidStone = new LiquidStone(credbullClient);

  const owner = credbullClient.createAccount(deployerPrivateKey);

  test('Test Simulate Approval', async () => {
    const erc20: ERC20 = new ERC20(credbullClient, testnetConfig.usdc);

    const approveTxn = erc20.approveTxn(liquidStone.address, depositAmount);
    const result = await simulateTransaction({
      transaction: approveTxn,
      account: owner,
    });

    // first, approve the deposit
    console.log(`Result : ${result}`);
  });

  test('Test Deposit', async () => {
    const erc20: ERC20 = new ERC20(credbullClient, await liquidStone.assetAddress());

    // first, approve the deposit
    const approveTxnReceipt = await erc20.approve(liquidStone.address, owner, depositAmount);
    console.log(`Approve Txn Hash: ${approveTxnReceipt.transactionHash}`);
    expect(approveTxnReceipt.status).toBe('success');

    // now, deposit
    const depositTxnReceipt = await liquidStone.deposit(owner, depositAmount, userAddress);
    console.log(`Deposit Txn Hash: ${depositTxnReceipt.transactionHash}`);
    expect(depositTxnReceipt.status).toBe('success');
  });

  // TODO - requires clean up.  call requestRedeem and then cancel the request.
  test.skip('Test RequestRedeem', async () => {
    const sharesToRedeem = 0.000001;

    const userAccount = credbullClient.createAccount(userPrivateKey);

    const requestRedeemTxnReceipt = await liquidStone.requestRedeem(userAccount, sharesToRedeem);
    console.log(`Request Redeem Txn Hash: ${requestRedeemTxnReceipt.transactionHash}`);
    expect(requestRedeemTxnReceipt.status).toBe('success');
  });
});
