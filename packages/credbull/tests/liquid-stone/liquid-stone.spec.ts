import { expect, test } from '@playwright/test';
import { CredbullClient } from '@src/credbull-client';
import { LiquidStone } from '@src/liquid-stone/liquid-stone';
import { ChainConfig, testnetConfig } from '@utils/chain-config';
import { Address } from '@utils/rpc-types';
import { toBigInt } from 'ethers';

const userAddress: Address = process.env.USER_ADDRESS as string;

const chainConfig: ChainConfig = testnetConfig;

// TODO: connect to Plume testnet (custom RPC)
// TODO: script out runbook deposits vs. redemptions
// TODO: move this to an integration test suite
test.describe('Test LiquidStone View functions', () => {
  const minExpectedAmount: number = 1;
  const liquidStone: LiquidStone = new LiquidStone(new CredbullClient(chainConfig));

  test('Test total supply is >= 1', async () => {
    const depositId = toBigInt(38);
    const supply = await liquidStone.totalSupplyById(depositId);
    expect(supply).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test total assets is >= 1', async () => {
    const assets = await liquidStone.totalAssets();
    expect(assets).toBeGreaterThanOrEqual(minExpectedAmount);

    const assetsByOwner = await liquidStone.totalAssetsByOwner(userAddress);
    expect(assetsByOwner).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test underlying asset is USDC', async () => {
    const liquidStoneAsset = await liquidStone.asset();
    expect(liquidStoneAsset).toBe(chainConfig.usdc);
  });

  test('Test scale is 10^6', async () => {
    const expectedScale = toBigInt(1_000_000);

    const liquidStoneScale: bigint = await liquidStone.scale();
    expect(liquidStoneScale).toBe(expectedScale);

    const amount = 25;
    expect(await liquidStone.scaleUp(amount)).toBe(toBigInt(25) * expectedScale);
  });
});
