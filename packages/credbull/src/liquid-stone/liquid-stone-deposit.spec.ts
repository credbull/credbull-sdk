import { expect, test } from '@playwright/test';
import { toBigInt } from 'ethers';
import { getContract, sendTransaction, waitForReceipt } from 'thirdweb';
import { approve } from 'thirdweb/extensions/erc20';
import { privateKeyToAccount } from 'thirdweb/wallets';

import { deposit } from '../thirdweb/extensions/credbull-v1.3/yield/LiquidContinousMultiTokenVault';
import { loadConfig } from '../utils/config';
import { chain, client, liquidStoneContract } from '../utils/thirdweb-client';

loadConfig();

const aliceAddress: string = '0x40524fB22EbF46ac8593F9945b936e3aD1dC33ba'; // credbull-devops wallet
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;

test.describe('Test LiquidStone Deposit & Redeem', () => {
  const depositAmount = 10;
  const deployerWallet = privateKeyToAccount({
    client,
    privateKey: deployerPrivateKey,
  });

  test('Test Grant Allowance', async () => {
    const usdcContract = getContract({
      client: client,
      address: process.env.USDC_ADDRESS as string,
      chain: chain,
    });

    const approveTxn = approve({
      contract: usdcContract,
      spender: liquidStoneContract.address,
      amount: depositAmount, // approve 10 here means 10 USDC
    });

    const approveTxnResult = await sendTransaction({
      account: deployerWallet, // the account initiating the transaction
      transaction: approveTxn,
    });

    const approveTxnReceipt = await waitForReceipt(approveTxnResult);
    console.log(`Approve Txn Hash: ${approveTxnReceipt.transactionHash}`);
  });

  test('Test deposit', async () => {
    const depositTxn = deposit({
      contract: liquidStoneContract,
      assets: toBigInt(depositAmount), // deposit 10 here means 0.000010 USDC
      receiver: aliceAddress,
      controller: deployerWallet.address,
    });

    try {
      const depositTxnResult = await sendTransaction({
        account: deployerWallet, // the account initiating the transaction
        transaction: depositTxn,
      });

      const depositTxnReceipt = await waitForReceipt(depositTxnResult);
      console.log(`Deposit Txn Hash: ${depositTxnReceipt.transactionHash}`);
    } catch (error) {
      console.error('Error sending deposit transaction:', error);
      throw error;
    }
  });
});
