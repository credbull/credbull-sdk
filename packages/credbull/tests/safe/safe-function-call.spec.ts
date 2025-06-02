import { expect, test } from '@playwright/test';
import { encode } from 'thirdweb';
import { Hex } from 'thirdweb/src/utils/encoding/hex';

import { CredbullClient } from '../../src/credbull-client';
import { ERC20 } from '../../src/erc20/erc20';
import { CredbullSafeClient } from '../../src/safe/credbull-safe-client';
import { ChainConfig, baseSepoliaConfig, loadConfiguration } from '../../src/utils/utils';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Suppress error about file not being under rootDir
import { safeClientSingleSigner, safeTestConfig } from './safe-test-config';

const envConfig = loadConfiguration();

const chainConfig: ChainConfig = baseSepoliaConfig;

test.describe('Test decode txn with Safe', () => {
  test('Test decode txn with Safe', async () => {
    // const safeClient: CredbullSafeClient = safeClientSingleSigner(envConfig.secret.deployerPrivateKey.valueOf());
    const safeClient = new CredbullSafeClient(
      safeTestConfig.chainConfig,
      safeTestConfig.safeWithSingleSigner,
      undefined, // signer not required - decode doesn't need it
    );

    const data =
      '0x095ea7b3000000000000000000000000e6fc577e87f7c977c4393300417dcc592d90acf8ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    const dataDecoded = await safeClient.decodeData(data);
    expect(dataDecoded.method).toBe('approve');
  });
});

test.describe('Test ERC20 Approve with Safe using Thirdweb', () => {
  const depositAmount = 1.1; // 1.1 tokens (human-readable)
  const usdcAddress = chainConfig.usdc;

  const erc20: ERC20 = new ERC20(new CredbullClient(chainConfig), usdcAddress);

  test('Test ERC20 Approve - Single signer', async () => {
    const safeClient: CredbullSafeClient = safeClientSingleSigner(envConfig.secret.deployerPrivateKey.valueOf());

    const usdcApproveTxn: Hex = await encode(erc20.approveTxn(envConfig.secret.userAddress, depositAmount));

    const safeTxnResult = await safeClient.call(usdcAddress, usdcApproveTxn);
    expect(safeTxnResult.status).toBe('EXECUTED');
  });
});
