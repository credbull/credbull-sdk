import { CredbullClient } from '@src/credbull-client';
import { LiquidStone } from '@src/liquid-stone/liquid-stone';
import { ChainConfig, plumeMainetConfig } from '@utils/chain-config';
import { Address } from '@utils/rpc-types';
import { toBigInt } from 'ethers';

interface OpsConfig extends ChainConfig {
  nestVault: Address;
}
const plumeMainnetOpsConfig: OpsConfig = {
  ...plumeMainetConfig,
  nestVault: '0x81537d879ACc8a290a1846635a0cAA908f8ca3a6',
};
const liquidStone: LiquidStone = new LiquidStone(new CredbullClient(plumeMainnetOpsConfig));

async function toAssets(shares: bigint, depositPeriod: bigint): Promise<bigint> {
  try {
    return await liquidStone.convertToAssetsAtCurrentPeriod(shares, depositPeriod);
  } catch (error) {
    console.error(`-- id[${depositPeriod}] Unable to convert to assets! Error: ${error}`);
    return toBigInt(0);
  }
}

async function toStrAssets(assets: bigint | number) {
  return `${await liquidStone.scaleDown(Number(assets))} USDC`;
}

function toStrShares(shares: bigint | number) {
  return `${shares.toLocaleString()} shares`;
}

async function logBalances(depositPeriod: bigint, skipZeroBalance = false) {
  const nestShares: bigint = await liquidStone.balanceOf(plumeMainnetOpsConfig.nestVault, depositPeriod);
  const totalShares: bigint = await liquidStone.totalSupplyById(depositPeriod);

  if (skipZeroBalance && nestShares == toBigInt(0) && totalShares == toBigInt(0)) {
    return;
  }

  console.log(
    `-- id[${depositPeriod}] nestVault: ${toStrShares(nestShares)}. (${await toStrAssets(await toAssets(nestShares, depositPeriod))}).`,
  );
  console.log(
    `-- id[${depositPeriod}] TOTAL    : ${toStrShares(totalShares)}. (${await toStrAssets(await toAssets(totalShares, depositPeriod))}).`,
  );

  if (totalShares != nestShares) {
    console.warn(
      `-- id[${depositPeriod}] !! WARNING !! Total and nestAgg balances differ by ${totalShares - nestShares} shares.  Check for other depositors / holders !!`,
    );
  }
}

async function logRequestRedeems() {
  const nestRequestReedemsArray = await liquidStone.unlockRequestsAll(plumeMainnetOpsConfig.nestVault);
  const stringifyWithBigInt = (key: string, value: any) => (typeof value === 'bigint' ? value.toString() : value);

  console.log(`-- nestVault redeem requests: ${JSON.stringify(nestRequestReedemsArray, stringifyWithBigInt)}`);
}

async function logAmountToInvest(depositPeriod: bigint) {
  const amountToInvest = await liquidStone.amountToInvest(plumeMainnetOpsConfig.nestVault, depositPeriod);
  console.log(`-- id[${depositPeriod}] Amount to Invest(+)/Redeem(-): ${await toStrAssets(amountToInvest)}`);
}

async function verboseLogging(startPeriod: bigint, endPeriod: bigint) {
  console.log(`Logging non-zero share balances from id[${startPeriod}] -> id[${endPeriod}]`);
  for (let depositPeriod = Number(startPeriod); depositPeriod <= Number(endPeriod); depositPeriod++) {
    await logBalances(toBigInt(depositPeriod), true);
  }
  console.log();
}

async function main(isVerbose = false) {
  console.log('Starting LiquidStone Ops checks...');
  console.log();

  const currentPeriod: bigint = await liquidStone.currentPeriod();

  console.log(`Current Period is: id[${currentPeriod}]\n`);

  if (isVerbose) {
    await verboseLogging(toBigInt(0), currentPeriod);
  }

  console.log(`Operations for period id[${currentPeriod}]`);

  await logBalances(currentPeriod);
  await logRequestRedeems();
  await logAmountToInvest(currentPeriod);

  console.log();

  console.log('LiquidStone Ops checks completed!');
}

// Entry point: handle errors globally
const verboseFlag = process.argv.includes('--verbose');

// Entry point: handle errors globally
main(verboseFlag).catch((err) => {
  console.error('Error in LiquidStone Ops !!', err);
  process.exit(1);
});
