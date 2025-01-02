import { expect, test } from '@playwright/test';
import { toBigInt } from 'ethers';

import { totalAssets } from '../thirdweb/extensions/credbull-v1.3/yield/LiquidContinousMultiTokenVault';
import { liquidStoneContract } from '../utils/thirdweb-client';

import { getTotalAssets, getTotalSupply } from './liquid-stone';

const aliceAddress: string = '0x40524fB22EbF46ac8593F9945b936e3aD1dC33ba'; // credbull-devops wallet

// TODO: connect to Plume mainnet (custom RPC)
// TODO: script out runbook deposits vs. redemptions
// TODO: move this to an integration test suite

test.describe('Test Liquid Stone Product', () => {
  test('Test total supply', async () => {
    const depositId = toBigInt(38);
    const supply = await getTotalSupply(depositId);
    expect(supply).toBeGreaterThanOrEqual(1);
  });

  test('Test total assets (address)', async () => {
    const userAssets = await getTotalAssets(aliceAddress);
    expect(userAssets).toBeGreaterThanOrEqual(1);
  });

  test('Test total assets ()', async () => {
    const assets = await totalAssets({
      contract: liquidStoneContract,
    });

    console.log(`assets: ${assets}`);

    expect(assets).toBeGreaterThanOrEqual(1);
  });
});
