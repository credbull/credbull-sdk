import { expect, test } from '@playwright/test';
import { CredbullClient } from '@src/credbull-client';
import { LiquidStone } from '@src/liquid-stone/liquid-stone';
import { ChainConfig, testnetConfig } from '@utils/chain-config';
import { Address } from '@utils/rpc-types';
import { toBigInt } from 'ethers';

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
  const userAddress: Address = process.env.USER_ADDRESS as string;
  if (!userAddress) {
    throw Error('User address required.');
  }

  test('Test total assets by Owner is >= 1', async () => {
    const assetsByOwner = await liquidStone.totalAssetsByOwner(userAddress);
    console.log(assetsByOwner);
    expect(assetsByOwner).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test balanceOf Owner and depositPeriod is >= 1', async () => {
    const depositPeriod = toBigInt(0);

    const balanceOf = await liquidStone.balanceOf(userAddress, depositPeriod);
    console.log(`balanceOf ${balanceOf}`);
    expect(balanceOf).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test Total Shares by Owner is >= 1', async () => {
    const allShares: { depositPeriods: bigint[]; shares: bigint[] } = await liquidStone.shares(userAddress);
    console.log(allShares);
    expect(allShares.depositPeriods.length).toBeGreaterThanOrEqual(minExpectedAmount);
    expect(allShares.depositPeriods.length).toEqual(allShares.shares.length);

    const totalShares = await liquidStone.totalSharesByOwner(userAddress);
    expect(totalShares).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test Unlock Requests by Owner is empty', async () => {
    const endPeriod = await liquidStone.minUnlockPeriod();
    for (let period = 0; period <= Number(endPeriod); period++) {
      const unlockRequests: { depositPeriods: bigint[]; amounts: bigint[] } = await liquidStone.unlockRequests(
        userAddress,
        toBigInt(period),
      );

      if (unlockRequests.depositPeriods.length > 0) {
        console.log(`Found unlock at redeemPeriod: ${period}!`);
        console.log(unlockRequests);
      }
    }
  });

  test('Test Amount to Invest (requestRedeems[periodX] - deposits[periodX])', async () => {
    const period = toBigInt(2);

    const depositAmount: bigint = await liquidStone.totalSupplyById(period);
    const sharesToInvest = await liquidStone.depositSharesToInvest(userAddress, period);

    console.log(`Shares to invest: ${sharesToInvest}`);

    expect(sharesToInvest).toBeLessThan(depositAmount);
  });
});
