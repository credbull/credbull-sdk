import { toBigInt } from 'ethers';

import { CredbullClient } from '../credbull-client';
import {
  Address,
  ChainConfig,
  plumeLegacyMainetConfig,
  plumeMainetConfig,
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

const plumeMainnetOpsConfig: OpsConfig = {
  ...plumeMainetConfig,
  nestVault: '0x593cCcA4c4bf58b7526a4C164cEEf4003C6388db',
};

export class LiquidStoneOps {
  private _opsConfig: OpsConfig;
  private _liquidStone: LiquidStone;
  private _isVerbose: boolean;

  constructor(opsConfig: OpsConfig, isVerbose: boolean = false) {
    this._opsConfig = opsConfig;
    this._liquidStone = new LiquidStone(new CredbullClient(this._opsConfig));
    this._isVerbose = isVerbose;
  }

  async toAssets(shares: bigint, depositPeriod: bigint): Promise<bigint> {
    try {
      return await this._liquidStone.convertToAssetsAtCurrentPeriod(shares, depositPeriod);
    } catch (error) {
      console.error(`-- id[${depositPeriod}] Unable to convert to assets! Error: ${error}`);
      return toBigInt(0);
    }
  }

  async logBalances(depositPeriod: bigint, skipZeroBalance = false) {
    const nestShares: bigint = await this._liquidStone.balanceOf(this._opsConfig.nestVault, depositPeriod);
    const totalShares: bigint = await this._liquidStone.totalSupplyById(depositPeriod);

    if (skipZeroBalance && nestShares == toBigInt(0) && totalShares == toBigInt(0)) {
      return;
    }

    console.log(
      `-- id[${depositPeriod}] nestVault: ${await toStrShares(nestShares)}. (${await toStrUSDC(await this.toAssets(nestShares, depositPeriod))}).`,
    );
    console.log(
      `-- id[${depositPeriod}] TOTAL    : ${await toStrShares(totalShares)}. (${await toStrUSDC(await this.toAssets(totalShares, depositPeriod))}).`,
    );

    if (totalShares != nestShares) {
      console.warn(
        `-- id[${depositPeriod}] !! WARNING !! Total and nestAgg balances differ by ${totalShares - nestShares} shares.  Check for other depositors / holders !!`,
      );
    }
  }

  async logRequestRedeems() {
    const nestRequestRedeemsArray = await this._liquidStone.unlockRequestsAll(this._opsConfig.nestVault);
    console.log(`-- nestVault redeem requests: ${JSON.stringify(nestRequestRedeemsArray, stringifyWithBigint())}`);
  }

  async logAmountToInvest(depositPeriod: bigint) {
    const amountToInvest = await this._liquidStone.amountToInvest(this._opsConfig.nestVault, depositPeriod);
    console.log(`-- id[${depositPeriod}] Amount to Invest(+)/Redeem(-): ${await toStrUSDC(amountToInvest)}`);
  }

  async verboseLogging(startPeriod: bigint, endPeriod: bigint) {
    console.log(`Logging non-zero share balances from id[${startPeriod}] -> id[${endPeriod}]`);
    for (let depositPeriod = Number(startPeriod); depositPeriod <= Number(endPeriod); depositPeriod++) {
      await this.logBalances(toBigInt(depositPeriod), true);
    }
    console.log();
  }

  async logDepositPeriod(depositPeriod: bigint) {
    const currentPeriod = Number(await this._liquidStone.currentPeriod());

    console.log(
      `Operations for period id[${depositPeriod}] (Current Period - ${currentPeriod - Number(depositPeriod)})`,
    );

    await this.logBalances(depositPeriod);
    await this.logRequestRedeems();
    await this.logAmountToInvest(depositPeriod);
    console.log();
  }

  async runOps() {
    console.log('Starting LiquidStone Ops checks...\n');

    const currentPeriod: bigint = await this._liquidStone.currentPeriod();
    const valuePadding = 25;

    console.log(`Current Period: id[${currentPeriod}]`);
    console.log(
      `Total Shares      : ${(await toStrShares(await this._liquidStone.totalSupply())).padStart(valuePadding)}`,
    );
    console.log(
      `Total Asset Value : ${(await toStrUSDC(await this._liquidStone.totalAssets())).padStart(valuePadding)}`,
    );
    console.log(
      `Asset Balance     : ${(await toStrUSDC(await this._liquidStone.assetBalance())).padStart(valuePadding)}`,
    );
    console.log();

    if (this._isVerbose) {
      await this.verboseLogging(toBigInt(0), currentPeriod);
    }

    // log previous period (skip period -1, not valid)
    if (currentPeriod > 0) {
      await this.logDepositPeriod(currentPeriod - toBigInt(1));
    }

    // log current period
    await this.logDepositPeriod(currentPeriod);

    console.log('LiquidStone Ops checks completed!');
  }
}

async function main() {
  const isVerbose = process.argv.includes('--verbose');
  const useLegacy = process.argv.includes('--legacy');

  const opsConfig: OpsConfig = useLegacy ? plumeLegacyMainnetOpsConfig : plumeMainnetOpsConfig;
  const liquidStoneOps: LiquidStoneOps = new LiquidStoneOps(opsConfig, isVerbose);

  await liquidStoneOps.runOps();
}

main().catch((err) => {
  console.error('Error in LiquidStone Ops !!', err);
  process.exit(1);
});
