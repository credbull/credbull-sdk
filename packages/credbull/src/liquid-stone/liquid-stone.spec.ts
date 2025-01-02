import { expect, test } from '@playwright/test';
import { toBigInt } from 'ethers';

import { getTotalAssets, getTotalSupply } from './liquid-stone';

const devopsAliceAddress: string = '0x40524fB22EbF46ac8593F9945b936e3aD1dC33ba';

// TODO: move this to an integration test suite
test.describe('Test Liquid Stone Product', () => {
  test('Test total supply', async () => {
    const depositId = toBigInt(38);

    const supply = await getTotalSupply(depositId);

    console.log(`supply: ${supply}`);

    expect(supply).toBeGreaterThanOrEqual(1);
  });

  test('Test total assets (address)', async () => {
    const userAssets = await getTotalAssets(devopsAliceAddress);

    console.log(`assets: ${userAssets}`);

    expect(userAssets).toBeGreaterThanOrEqual(1);
  });
});
