import { expect, test } from '@playwright/test';
import { SafeClient } from '@safe-global/sdk-starter-kit';
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants';
import { approveTxn } from '@src/erc20/erc20';
import { connectSafe } from '@src/safe/safe-client';
import { logTxnResult, sendTxn } from '@src/safe/safe-txn';
import { loadConfig } from '@utils/config';
import { Address } from '@utils/rpc-types';
import { encode } from 'thirdweb';
import { Hex } from 'thirdweb/src/utils/encoding/hex';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Suppress error about file not being under rootDir
import { baseSepoliaConfig } from './safe-test-config';

loadConfig();

const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
const spenderAddress: Address = process.env.USER_ADDRESS as string;

test.describe('Test ERC20 Approve with Safe using Thirdweb', () => {
  const depositAmount = 1.1; // 1.1 tokens (human-readable)

  test('Test ERC20 Approve - Single signer', async () => {
    const safeClient: SafeClient = await connectSafe(
      baseSepoliaConfig.chain.rpc,
      baseSepoliaConfig.safeWithSingleSigner,
      deployerPrivateKey,
    );

    const usdcApproveTxn: Hex = await encode(await approveTxn(baseSepoliaConfig.usdc, spenderAddress, depositAmount));

    const safeTxnResult = await sendTxn(safeClient, baseSepoliaConfig.usdc, usdcApproveTxn);
    logTxnResult(safeTxnResult);
    expect(safeTxnResult.status).toBe(SafeClientTxStatus.EXECUTED);
  });
});
