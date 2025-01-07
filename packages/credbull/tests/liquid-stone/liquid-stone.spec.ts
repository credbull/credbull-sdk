import { expect, test } from '@playwright/test';
import { CredbullClient } from '@src/credbull-client';
import { LiquidStone } from '@src/liquid-stone/liquid-stone';
import { ChainConfig, testnetConfig } from '@utils/chain-config';
import { Address } from '@utils/rpc-types';
import { toBigInt } from 'ethers';

const userAddress: Address = process.env.USER_ADDRESS as string;
if (!userAddress) {
  throw Error('User address required.');
}

const chainConfig: ChainConfig = testnetConfig;

const minExpectedAmount: number = 1;
const liquidStone: LiquidStone = new LiquidStone(new CredbullClient(chainConfig));

test.describe('Test LiquidStone view functions', () => {
  test('Test current period >= 1', async () => {
    const currentPeriod = await liquidStone.currentPeriod();
    expect(currentPeriod).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test total supply is >= 1', async () => {
    const depositId = toBigInt(0);
    const supply = await liquidStone.totalSupplyById(depositId);
    expect(supply).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test underlying asset is USDC', async () => {
    const liquidStoneAsset = await liquidStone.asset();
    expect(liquidStoneAsset).toBe(chainConfig.usdc);
  });

  test('Test total assets >= 1', async () => {
    const assets = await liquidStone.totalAssets();
    expect(assets).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test scale is 10^6', async () => {
    const expectedScale = toBigInt(1_000_000);

    const liquidStoneScale: bigint = await liquidStone.scale();
    expect(liquidStoneScale).toBe(expectedScale);

    const amount = 25;
    expect(await liquidStone.scaleUp(amount)).toBe(toBigInt(amount) * expectedScale);
  });
});

// View - User specific
test.describe('Test LiquidStone view functions - User Specific', () => {
  test('Test total assets by Owner is >= 1', async () => {
    const assetsByOwner = await liquidStone.totalAssetsByOwner(userAddress);
    expect(assetsByOwner).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test Amount to Invest (requestRedeems[periodX] - deposits[periodX])', async () => {
    const depositPeriod = toBigInt(2);

    // get the deposits
    const depoositsAtValuePeriod = await liquidStone.totalSupplyById(depositPeriod);
    console.log(depoositsAtValuePeriod);

    // TODO - calc the requestId / redeemPeriod from the noticePeeriod
    const redeemPeriod = depositPeriod + (await liquidStone.noticePeriod());

    // TODO - need to loop through all depositors or use a user-agnostic function
    // get the unlock request amount
    const unlockRequestAmountAtValuePeriod = await liquidStone.unlockRequests(userAddress, redeemPeriod);
    console.log(unlockRequestAmountAtValuePeriod);

    // TODO - calc unlockRequestAssetsAmount by converting unlockRequests in shares to assets and then totaling

    // TODO - calc difference of unlockRequestAssetsAmount - depositValue

    // assert this is > 0
  });
});
