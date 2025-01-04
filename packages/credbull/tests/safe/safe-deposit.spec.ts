import { expect, test } from '@playwright/test';
import { SafeClient, SafeClientResult } from '@safe-global/sdk-starter-kit';
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants';
import { connectSafe } from '@src/safe/safe-client';
import { confirmTxn, deposit, logTxnResult } from '@src/safe/safe-txn';
import { loadConfig } from '@utils/config';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Suppress error about file not being under rootDir
import { baseSepoliaConfig } from './safe-test-config';

loadConfig();

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
const deployerAltPrivateKey = process.env.DEPLOYER_ALT_PRIVATE_KEY as string;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test Safe Deposit', () => {
  const depositAmountInWei = '0000000000000000001'; // 1 wei

  test('Test Deposit - Multi-sig (2 of N)', async () => {
    // first signer - proposes
    const safeClientSigner1: SafeClient = await connectSafe(
      baseSepoliaConfig.chain.rpc,
      baseSepoliaConfig.safeWithMultiSig,
      deployerPrivateKey,
    );
    const safeClientAddress = await safeClientSigner1.getAddress();
    const depositTxnResult: SafeClientResult = await deposit(safeClientSigner1, safeClientAddress, depositAmountInWei);

    logTxnResult(depositTxnResult);
    expect(depositTxnResult.status).toBe(SafeClientTxStatus.PENDING_SIGNATURES);
    const depositSafeTxnHash = depositTxnResult.transactions?.safeTxHash;
    expect(depositSafeTxnHash).toBeDefined();

    // second signer - confirms
    const safeClientSigner2: SafeClient = await connectSafe(
      baseSepoliaConfig.chain.rpc,
      baseSepoliaConfig.safeWithMultiSig,
      deployerAltPrivateKey,
    );
    const confirmTxnResult = await confirmTxn(safeClientSigner2, depositSafeTxnHash!);
    logTxnResult(confirmTxnResult);

    expect(confirmTxnResult?.status).toBe(SafeClientTxStatus.EXECUTED);
  });

  // TODO: failing integration test:
  //  ContractFunctionExecutionError: The contract function "execTransaction" reverted with the following reason:
  //     replacement transaction underpriced
  test.skip('Test Deposit - Single signer', async () => {
    const safeClient: SafeClient = await connectSafe(
      baseSepoliaConfig.chain.rpc,
      baseSepoliaConfig.safeWithSingleSigner,
      deployerPrivateKey,
    );

    const safeClientAddress = await safeClient.getAddress();
    const depositTxnResult: SafeClientResult = await deposit(safeClient, safeClientAddress, depositAmountInWei);

    logTxnResult(depositTxnResult);
    expect(depositTxnResult.status).toBe(SafeClientTxStatus.EXECUTED);
  });
});
