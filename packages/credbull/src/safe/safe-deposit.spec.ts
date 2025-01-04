import { expect, test } from '@playwright/test';
import { SafeClient, SafeClientResult } from '@safe-global/sdk-starter-kit';
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants';

import { Address } from '../utils/address';
import { loadConfig } from '../utils/config';
import { confirmSafeTxn, connectSafe, log } from '../utils/safe-client';

import { safeDeposit } from './safe-deposit';

loadConfig();

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
const deployerAltPrivateKey = process.env.DEPLOYER_ALT_PRIVATE_KEY as string;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test Safe Deposit', () => {
  const depositAmountInWei = '0000000000000000001'; // 1 wei

  test('Test Deposit - Single signer', async () => {
    const safeWithSingleSigner: Address = '0x40AD1Ae6EdBb0F6DD8837b2d52680A2046A0628b';

    const safeClient: SafeClient = await connectSafe(safeWithSingleSigner, deployerPrivateKey);

    const safeClientAddress = await safeClient.getAddress();
    const depositTxnResult: SafeClientResult = await safeDeposit(safeClient, safeClientAddress, depositAmountInWei);

    log(depositTxnResult);
    expect(depositTxnResult.status).toBe(SafeClientTxStatus.EXECUTED);
  });

  test('Test Deposit - Multi-sig (2 of N)', async () => {
    const safeWithMultiSig: Address = '0xE8aD45571A667E7cF7E976842BDabE0Eb87D8F68';

    // first signer - proposes
    const safeClientSigner1: SafeClient = await connectSafe(safeWithMultiSig, deployerPrivateKey);
    const safeClientAddress = await safeClientSigner1.getAddress();
    const depositTxnResult: SafeClientResult = await safeDeposit(
      safeClientSigner1,
      safeClientAddress,
      depositAmountInWei,
    );

    log(depositTxnResult);
    expect(depositTxnResult.status).toBe(SafeClientTxStatus.PENDING_SIGNATURES);
    const depositSafeTxnHash = depositTxnResult.transactions?.safeTxHash;
    expect(depositSafeTxnHash).toBeDefined();

    // second signer - confirms
    const safeClientSigner2: SafeClient = await connectSafe(safeWithMultiSig, deployerAltPrivateKey);
    const confirmTxnResult = await confirmSafeTxn(safeClientSigner2, depositSafeTxnHash!);
    log(confirmTxnResult);

    expect(confirmTxnResult?.status).toBe(SafeClientTxStatus.EXECUTED);
  });
});
