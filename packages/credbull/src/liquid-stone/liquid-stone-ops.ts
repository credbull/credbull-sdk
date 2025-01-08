import { CredbullClient } from '@src/credbull-client';
import { LiquidStone } from '@src/liquid-stone/liquid-stone';
import { ChainConfig, plumeMainetConfig } from '@utils/chain-config';
import { Address } from '@utils/rpc-types';

interface OpsConfig extends ChainConfig {
  nestVault: Address;
}
const plumeMainnetOpsConfig: OpsConfig = {
  ...plumeMainetConfig,
  nestVault: '0x81537d879ACc8a290a1846635a0cAA908f8ca3a6',
};
const liquidStone: LiquidStone = new LiquidStone(new CredbullClient(plumeMainnetOpsConfig));

async function logBalances(depositPeriod: bigint) {
  const nestDepositAmount: bigint = await liquidStone.balanceOf(plumeMainnetOpsConfig.nestVault, depositPeriod);
  console.log(`-- nestVault balanceOf[${depositPeriod}]: ${nestDepositAmount.toLocaleString()} shares`);

  const currentPeriodDepositAmount: bigint = await liquidStone.totalSupplyById(depositPeriod);
  console.log(`-- TOTAL balanceOf[${depositPeriod}]    : ${currentPeriodDepositAmount.toLocaleString()} shares`);

  if (currentPeriodDepositAmount != nestDepositAmount) {
    console.warn(
      `!! WARNING !! Total and nestAgg balanceOf[${depositPeriod}] differ by ${currentPeriodDepositAmount - nestDepositAmount} shares.  Check for other depositors / holders !!`,
    );
  }
}

async function logRequestRedeems() {
  const nestRequestReedemsArray = await liquidStone.unlockRequestsAll(plumeMainnetOpsConfig.nestVault);
  const stringifyWithBigInt = (key: string, value: any) => (typeof value === 'bigint' ? value.toString() : value);

  console.log(`-- nestVault redeem requests: ${JSON.stringify(nestRequestReedemsArray, stringifyWithBigInt)}`);
}

async function logAmountToInvest(currentPeriod: bigint) {
  const amountToInvest = await liquidStone.amountToInvest(plumeMainnetOpsConfig.nestVault, currentPeriod);
  console.log(`-- Amount to Invest(+)/Redeem(-): ${await liquidStone.scaleDown(amountToInvest)} USDC`);
}

async function main() {
  console.log('Starting LiquidStone Ops checks...');
  console.log();

  const currentPeriod: bigint = await liquidStone.currentPeriod();

  console.log(`Current Period: ${currentPeriod}`);

  await logBalances(currentPeriod);
  await logRequestRedeems();
  await logAmountToInvest(currentPeriod);

  console.log();
  console.log('LiquidStone Ops checks completed!');
}

// Entry point: handle errors globally
main().catch((err) => {
  console.error('Error in LiquidStone Ops !!', err);
  process.exit(1);
});
