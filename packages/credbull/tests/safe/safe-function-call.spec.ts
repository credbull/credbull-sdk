import { expect, test } from '@playwright/test';
import { SafeClient, SafeClientResult } from '@safe-global/sdk-starter-kit';
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants';
import { approveTxn } from '@src/erc20/erc20';
import { connectSafe, log } from '@src/safe/safe-client';
import { Address } from '@utils/address';
import { loadConfig } from '@utils/config';
import { encode } from 'thirdweb';

loadConfig();

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
const USDC_BASE_SEPOLIA = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'; //https://base-sepolia.blockscout.com/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e

test.describe('Test ERC20 Approve with Safe using Thirdweb', () => {
  const spenderAddress: Address = process.env.USER_ADDRESS as string;
  const depositAmount = 1.1; // 1 token (human-readable)
  const usdcContractAddress = USDC_BASE_SEPOLIA;

  test('Test ERC20 Approve - Single signer', async () => {
    const safeWithSingleSigner: Address = '0x40AD1Ae6EdBb0F6DD8837b2d52680A2046A0628b';
    const safeClient: SafeClient = await connectSafe(safeWithSingleSigner, deployerPrivateKey);

    const approveTxnData = await encode(await approveTxn(usdcContractAddress, spenderAddress, depositAmount));

    const transactions = [
      {
        to: usdcContractAddress,
        value: '0', // 1 wei
        data: approveTxnData, // Optional: calldata for contract interaction
      },
    ];

    // propose the approve txn via Safe
    const depositTxnResult: SafeClientResult = await safeClient.send({
      transactions,
    });

    log(depositTxnResult);
    expect(depositTxnResult.status).toBe(SafeClientTxStatus.EXECUTED);
  });
});
