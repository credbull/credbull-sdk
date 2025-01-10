import { expect, test } from '@playwright/test';
import { SafeClientTxStatus } from '@safe-global/sdk-starter-kit/dist/src/constants';
import { encode } from 'thirdweb';
import { Hex } from 'thirdweb/src/utils/encoding/hex';

import { CredbullClient } from '../../src/credbull-client';
import { ERC20 } from '../../src/erc20/erc20';
import { CredbullSafeClient } from '../../src/safe/credbull-safe-client';
import { ChainConfig, baseSepoliaConfig } from '../../src/utils/chain-config';
import { loadConfig } from '../../src/utils/config';
import { Address } from '../../src/utils/rpc-types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Suppress error about file not being under rootDir
import { safeClientSingleSigner } from './safe-test-config';

loadConfig();

const chainConfig: ChainConfig = baseSepoliaConfig;
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
const spenderAddress: Address = process.env.USER_ADDRESS as string;

test.describe('Test ERC20 Approve with Safe using Thirdweb', () => {
  const depositAmount = 1.1; // 1.1 tokens (human-readable)
  const usdcAddress = chainConfig.usdc;

  const erc20: ERC20 = new ERC20(new CredbullClient(chainConfig), usdcAddress);

  test('Test ERC20 Approve - Single signer', async () => {
    const safeClient: CredbullSafeClient = safeClientSingleSigner(deployerPrivateKey);

    const usdcApproveTxn: Hex = await encode(erc20.approveTxn(spenderAddress, depositAmount));

    const safeTxnResult = await safeClient.call(usdcAddress, usdcApproveTxn);
    expect(safeTxnResult.status).toBe(SafeClientTxStatus.EXECUTED);
  });
});
