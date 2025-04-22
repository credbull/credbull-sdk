import { toBigInt } from 'ethers';

import { CredbullClient } from '../credbull-client';
import {
  Address,
  ChainConfig,
  plumeLegacyMainetConfig,
  // plumeMainetConfig,
  stringifyWithBigint,
  toStrShares,
  toStrUSDC,
} from '../utils/utils';

import { LiquidStone } from './liquid-stone';

interface OpsConfig extends ChainConfig {
  nestVault: Address;
}

const plumeLegacyMainnetOpsConfig: OpsConfig = {
  ...plumeLegacyMainetConfig,
  nestVault: '0x81537d879ACc8a290a1846635a0cAA908f8ca3a6',
};

// const plumeMainnetOpsConfig: OpsConfig = {
//   ...plumeMainetConfig,
//   nestVault: '0x593cCcA4c4bf58b7526a4C164cEEf4003C6388db',
// };

const liquidStone: LiquidStone = new LiquidStone(new CredbullClient(plumeLegacyMainnetOpsConfig));

async function toAssets(shares: bigint, depositPeriod: bigint): Promise<bigint> {
  try {
    return await liquidStone.convertToAssetsAtCurrentPeriod(shares, depositPeriod);
  } catch (error) {
    console.error(`-- id[${depositPeriod}] Unable to convert to assets! Error: ${error}`);
    return toBigInt(0);
  }
}

async function logBalances(depositPeriod: bigint, skipZeroBalance = false) {
  const nestShares: bigint = await liquidStone.balanceOf(plumeLegacyMainnetOpsConfig.nestVault, depositPeriod);
  const totalShares: bigint = await liquidStone.totalSupplyById(depositPeriod);

  if (skipZeroBalance && nestShares == toBigInt(0) && totalShares == toBigInt(0)) {
    return;
  }

  console.log(
    `-- id[${depositPeriod}] nestVault: ${await toStrShares(nestShares)}. (${await toStrUSDC(await toAssets(nestShares, depositPeriod))}).`,
  );
  console.log(
    `-- id[${depositPeriod}] TOTAL    : ${await toStrShares(totalShares)}. (${await toStrUSDC(await toAssets(totalShares, depositPeriod))}).`,
  );

  if (totalShares != nestShares) {
    console.warn(
      `-- id[${depositPeriod}] !! WARNING !! Total and nestAgg balances differ by ${totalShares - nestShares} shares.  Check for other depositors / holders !!`,
    );
  }
}

async function logRequestRedeems() {
  const nestRequestReedemsArray = await liquidStone.unlockRequestsAll(plumeLegacyMainnetOpsConfig.nestVault);
  console.log(`-- nestVault redeem requests: ${JSON.stringify(nestRequestReedemsArray, stringifyWithBigint())}`);
}

async function logAmountToInvest(depositPeriod: bigint) {
  const amountToInvest = await liquidStone.amountToInvest(plumeLegacyMainnetOpsConfig.nestVault, depositPeriod);
  console.log(`-- id[${depositPeriod}] Amount to Invest(+)/Redeem(-): ${await toStrUSDC(amountToInvest)}`);
}

async function verboseLogging(startPeriod: bigint, endPeriod: bigint) {
  console.log(`Logging non-zero share balances from id[${startPeriod}] -> id[${endPeriod}]`);
  for (let depositPeriod = Number(startPeriod); depositPeriod <= Number(endPeriod); depositPeriod++) {
    await logBalances(toBigInt(depositPeriod), true);
  }
  console.log();
}

async function logDepositPeriod(depositPeriod: bigint) {
  const currentPeriod = Number(await liquidStone.currentPeriod());

  console.log(`Operations for period id[${depositPeriod}] (Current Period - ${currentPeriod - Number(depositPeriod)})`);

  await logBalances(depositPeriod);
  await logRequestRedeems();
  await logAmountToInvest(depositPeriod);
  console.log();
}

async function main(isVerbose = false) {
  console.log('Starting LiquidStone Ops checks...');
  console.log();

  const currentPeriod: bigint = await liquidStone.currentPeriod();

  const valuePadding = 25;

  console.log(`Current Period: id[${currentPeriod}]`);
  console.log(`Total Shares      : ${(await toStrShares(await liquidStone.totalSupply())).padStart(valuePadding)}`);
  console.log(`Total Asset Value : ${(await toStrUSDC(await liquidStone.totalAssets())).padStart(valuePadding)}`);
  console.log(`Asset Balance     : ${(await toStrUSDC(await liquidStone.assetBalance())).padStart(valuePadding)}`);

  console.log();

  if (isVerbose) {
    await verboseLogging(toBigInt(0), currentPeriod);
  }

  await logDepositPeriod(currentPeriod - toBigInt(1));
  await logDepositPeriod(currentPeriod);

  console.log('LiquidStone Ops checks completed!');
}

// Entry point: handle errors globally
const verboseFlag = process.argv.includes('--verbose');

// Entry point: handle errors globally
main(verboseFlag).catch((err) => {
  console.error('Error in LiquidStone Ops !!', err);
  process.exit(1);
});
