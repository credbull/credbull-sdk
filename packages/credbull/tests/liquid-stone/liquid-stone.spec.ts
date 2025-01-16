import { expect, test } from '@playwright/test';
import { toBigInt } from 'ethers';
import { encode } from 'thirdweb';
import { Hex } from 'thirdweb/src/utils/encoding/hex';
import { decodeFunctionData } from 'thirdweb/utils';

import { CredbullClient } from '../../src/credbull-client';
import { LiquidStone, withdrawAsset } from '../../src/liquid-stone/liquid-stone';
import { Address, ChainConfig, testnetConfig } from '../../src/utils/utils';

const chainConfig: ChainConfig = testnetConfig;

const minExpectedAmount: number = 1;
const liquidStone: LiquidStone = new LiquidStone(new CredbullClient(chainConfig));

test.describe('Test LiquidStone view functions', () => {
  test('Test current period >= 1', async () => {
    expect(await liquidStone.currentPeriod()).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test total supply is >= 1', async () => {
    const depositId = toBigInt(0);
    expect(await liquidStone.totalSupplyById(depositId)).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test underlying asset is USDC', async () => {
    expect(await liquidStone.assetAddress()).toBe(chainConfig.usdc);
  });

  test('Test vault asset balance >= 1', async () => {
    expect(await liquidStone.assetBalance()).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test total assets >= 1', async () => {
    expect(await liquidStone.totalAssets()).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test scale is 10^6', async () => {
    const expectedScale = toBigInt(1_000_000);

    const liquidStoneScale: bigint = await liquidStone.scale();
    expect(liquidStoneScale).toBe(expectedScale);

    const amount = 25;
    expect(await liquidStone.scaleUp(amount)).toBe(toBigInt(amount) * expectedScale);
  });

  test('Test encode/decode withdraw assets', async () => {
    const to: Address = chainConfig.liquidStone;
    const amount = 0.00002;

    const withdrawTxn = withdrawAsset({
      contract: liquidStone.contract,
      amount: await liquidStone.scaleUp(amount),
      to,
    });

    // encode
    const encWithdrawTxn: Hex = await encode(withdrawTxn);

    // decode.  expected result: [ '<toAddress', <scaledAmount> ]
    const decodedData = (await decodeFunctionData({
      contract: liquidStone.contract,
      data: encWithdrawTxn,
    })) as [string, bigint]; // typecast to expected output;

    expect(decodedData[0].toLowerCase()).toEqual(to.toLowerCase());
    expect(decodedData[1]).toEqual(await liquidStone.scaleUp(amount));
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
    const unlockRequests = await liquidStone.unlockRequestsAll(userAddress);
    expect(unlockRequests.length).toBeGreaterThanOrEqual(minExpectedAmount);
  });

  test('Test Amount to Invest (requestRedeems[periodX] - deposits[periodX])', async () => {
    const period = toBigInt(2);

    const depositAmount: bigint = await liquidStone.totalSupplyById(period);
    const amountToInvest = await liquidStone.amountToInvest(userAddress, period);

    console.log(`Amount to invest: ${amountToInvest}`);

    expect(amountToInvest).toBeLessThan(depositAmount);
  });
});
