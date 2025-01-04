import { expect, test } from '@playwright/test';
import {
  asset,
  scale,
  scaleUp,
  totalAssets,
  totalAssetsByOwner,
  totalSupplyById,
} from '@src/liquid-stone/liquid-stone';
import { Address } from '@utils/address';
import { toBigInt } from 'ethers';

const userAddress: Address = process.env.USER_ADDRESS as string;
const usdcAddress: Address = process.env.USDC_ADDRESS as string;

// TODO: connect to Plume testnet (custom RPC)
// TODO: script out runbook deposits vs. redemptions
// TODO: move this to an integration test suite
test.describe('Test LiquidStone View functions', () => {
  const minExpectedAmount: number = 1;

  test('Test total supply is >= 1', async () => {
    const depositId = toBigInt(38);
    const supply = await totalSupplyById(depositId);
    expect(supply).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test total assets is >= 1', async () => {
    const assets = await totalAssets();
    expect(assets).toBeGreaterThanOrEqual(minExpectedAmount);

    const assetsByOwner = await totalAssetsByOwner(userAddress);
    expect(assetsByOwner).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test underlying asset is USDC', async () => {
    const liquidStoneAsset = await asset();
    expect(liquidStoneAsset).toBe(usdcAddress);
  });

  test('Test scale is 10^6', async () => {
    const expectedScale = toBigInt(1_000_000);

    const liquidStoneScale: bigint = await scale();
    expect(liquidStoneScale).toBe(expectedScale);

    const amount = 25;
    expect(await scaleUp(amount)).toBe(toBigInt(25) * expectedScale);
  });
});
