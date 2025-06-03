import { SafeMultisigTransactionListResponse } from '@safe-global/api-kit';
import { GetCurrencyMetadataResult } from 'thirdweb/dist/types/extensions/erc20/read/getCurrencyMetadata';

import { CredbullClient } from '../credbull-client';
import { ERC20 } from '../erc20/erc20';
import { CredbullSafeClient } from '../safe/credbull-safe-client';
import { toStrUSDC } from '../utils/format';
import { Address } from '../utils/utils';

import { EnzymeConfig, calcFundNav } from './enzyme/enzyme';
import { EnzymeFundConfig, enzymePolygonConfig } from './enzyme/enzyme-config';

const enzymeConfig: EnzymeConfig = enzymePolygonConfig;

const valuePadding = 25;

export class FundOps {
  private _enzymeConfig: EnzymeConfig;
  private _fundConfig: EnzymeFundConfig;
  private _credbullClient: CredbullClient<EnzymeConfig>;
  private _erc20: ERC20;

  constructor(enzymeConfig: EnzymeConfig, fundConfig: EnzymeFundConfig) {
    this._enzymeConfig = enzymeConfig;
    this._fundConfig = fundConfig;

    this._credbullClient = new CredbullClient(this._enzymeConfig);
    this._erc20 = new ERC20(this._credbullClient, this._credbullClient.chainConfig.usdc);
  }

  async logBalance(holderName: string, owner: Address) {
    console.log(`-- ${holderName}: ${(await toStrUSDC(await this._erc20.balanceOf(owner))).padStart(valuePadding)}`);
  }

  async logPendingSafeTxns(safeName: string, safeAddress: Address) {
    const safeClient = new CredbullSafeClient(this._credbullClient.chainConfig, safeAddress, undefined);

    const pendingTransactions: SafeMultisigTransactionListResponse = await safeClient.getPendingTransactions();

    console.log(`-- ${safeName}  : Pending Safe txns: ${pendingTransactions.results.length}`);

    for (const transaction of pendingTransactions.results) {
      console.log(`-- ${safeName}: Pending Safe txn: ${transaction}`);
    }
  }

  async logFundNav() {
    const { navDenominationAsset, nav } = await calcFundNav(this._credbullClient, this._fundConfig.fundAddress);

    if (navDenominationAsset.toLowerCase() != this._erc20.address.toLowerCase()) {
      console.error(`NAV Asset wrong !! Asset is ${navDenominationAsset}, but expected ${this._erc20.address} !!`);
    }

    console.log(`BlackOpal Fund NAV (On+Off-Chain): ${(await toStrUSDC(nav)).padStart(valuePadding)}`);
  }

  // TODO - add the required actions, rather than just logging.  e.g. Specify which Safe has balances or pending txns.
  async runOps() {
    console.log(`Starting ${this._fundConfig.fundName} Fund Ops checks...`);
    console.log();

    await this.logFundNav();

    console.log();

    const erc20Metadata: GetCurrencyMetadataResult = await this._erc20.getCurrencyMetadata();

    console.log(
      `Balances of ${this._credbullClient.chainConfig.chainName} '${erc20Metadata.name}' (${erc20Metadata.symbol}) at ${this._erc20.address}.`,
    );

    await this.logBalance('[Safe] Credbull Defi Custody         ', this._fundConfig.fundApprovers.credbullDefiCustody);
    await this.logBalance('[Safe] BlackOpal Fund Owner Custody  ', this._fundConfig.fundApprovers.blackOpalFundOwner);
    await this.logBalance('[Enzyme] BlackOpal LiquidStone Fund  ', this._fundConfig.fundAddress);
    await this.logBalance('[Enzyme] BlackOpal LS Fund Flex Loan ', this._fundConfig.fundFlexibleLoans[0].flexibleLoan);
    await this.logBalance(
      '[Safe] BlackOpal Fund Custody Wrapper',
      this._fundConfig.fundApprovers.blackOpalFundCustodianWrapper,
    );

    console.log();

    console.log(`Safe Multi-Sig Pending Safe Transactions for approval.`);

    await this.logPendingSafeTxns(
      '[Safe] Credbull Defi Custody         ',
      this._fundConfig.fundApprovers.credbullDefiCustody,
    );
    await this.logPendingSafeTxns(
      '[Safe] BlackOpal Fund Owner Custody  ',
      this._fundConfig.fundApprovers.blackOpalFundOwner,
    );
    await this.logPendingSafeTxns(
      '[Safe] BlackOpal Fund Custody Wrapper',
      this._fundConfig.fundApprovers.blackOpalFundCustodianWrapper,
    );

    console.log();

    console.log(`${this._fundConfig.fundName} Fund Ops checks completed!`);
  }
}

async function main() {
  if (enzymeConfig.liquidStonePlumeLegacyFund) {
    const legacyPlumeFund: FundOps = new FundOps(enzymeConfig, enzymeConfig.liquidStonePlumeLegacyFund);
    await legacyPlumeFund.runOps();
    console.log();
    console.log('=======================================================================');
    console.log();
  }

  const liquidStoneFund: FundOps = new FundOps(enzymeConfig, enzymeConfig.liquidStoneFund);
  await liquidStoneFund.runOps();
}

// Entry point: handle errors globally
main().catch((err) => {
  console.error('Error in BlackOpal Fund Ops !!', err);
  process.exit(1);
});
