import { expect, test } from '@playwright/test';
import { SafeClientResult } from '@safe-global/sdk-starter-kit';
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants';

import { CredbullSafeClient } from '../../src/safe/credbull-safe-client';
import { loadConfig } from '../../src/utils/utils';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Suppress error about file not being under rootDir
import { safeClientMultiSig, safeClientSingleSigner } from './safe-test-config';

loadConfig();

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
const deployerAltPrivateKey = process.env.DEPLOYER_ALT_PRIVATE_KEY as string;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test Safe Deposit', () => {
  const depositAmountInWei = '0000000000000000001'; // 1 wei

  test('Test Deposit - Multi-sig (2 of N)', async () => {
    // first signer - proposes
    const safeClientSigner1: CredbullSafeClient = safeClientMultiSig(deployerPrivateKey);

    const toAddress = safeClientSigner1.safeAddress;
    const depositTxnResult: SafeClientResult = await safeClientSigner1.deposit(toAddress, depositAmountInWei);
    expect(depositTxnResult.status).toBe(SafeClientTxStatus.PENDING_SIGNATURES);
    const depositSafeTxnHash = depositTxnResult.transactions?.safeTxHash;
    expect(depositSafeTxnHash).toBeDefined();

    // second signer - confirms
    const safeClientSigner2: CredbullSafeClient = safeClientMultiSig(deployerAltPrivateKey);
    const confirmTxnResult = await safeClientSigner2.confirmTxn(depositSafeTxnHash!);

    expect(confirmTxnResult?.status).toBe(SafeClientTxStatus.EXECUTED);
  });

  // TODO: failing integration test:
  //  ContractFunctionExecutionError: The contract function "execTransaction" reverted with the following reason:
  //     replacement transaction underpriced
  test.skip('Test Deposit - Single signer', async () => {
    const safeClient: CredbullSafeClient = safeClientSingleSigner(deployerPrivateKey);

    const toAddress = safeClient.safeAddress;
    const depositTxnResult: SafeClientResult = await safeClient.deposit(toAddress, depositAmountInWei);

    expect(depositTxnResult.status).toBe(SafeClientTxStatus.EXECUTED);
  });
});
