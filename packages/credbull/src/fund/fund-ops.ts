import { SafeMultisigTransactionListResponse } from '@safe-global/api-kit';
import { GetCurrencyMetadataResult } from 'thirdweb/dist/types/extensions/erc20/read/getCurrencyMetadata';

import { CredbullClient } from '../credbull-client';
import { ERC20 } from '../erc20/erc20';
import { CredbullSafeClient } from '../safe/credbull-safe-client';
import { toStrUSDC } from '../utils/format';
import { Address } from '../utils/utils';

import { calcFundNav } from './enzyme/enzyme';
import { EnzymeFundConfig, enzymePolygonConfig } from './enzyme/enzyme-config';

const credbullClient = new CredbullClient(enzymePolygonConfig);
const liquidStoneFund: EnzymeFundConfig = credbullClient.chainConfig.liquidStoneFund;
const erc20: ERC20 = new ERC20(credbullClient, credbullClient.chainConfig.usdc);

const valuePadding = 25;

async function logBalance(holderName: string, owner: Address) {
  console.log(`-- ${holderName}: ${(await toStrUSDC(await erc20.balanceOf(owner))).padStart(valuePadding)}`);
}

async function logPendingSafeTxns(safeName: string, safeAddress: Address) {
  const safeClient = new CredbullSafeClient(credbullClient.chainConfig, safeAddress, undefined);

  const pendingTransactions: SafeMultisigTransactionListResponse = await safeClient.getPendingTransactions();

  console.log(`-- ${safeName}  : Pending Safe txns: ${pendingTransactions.results.length}`);

  for (const transaction of pendingTransactions.results) {
    console.log(`-- ${safeName}: Pending Safe txn: ${transaction}`);
  }
}

async function logFundNav() {
  const { navDenominationAsset, nav } = await calcFundNav(credbullClient, liquidStoneFund.fundAddress);

  if (navDenominationAsset.toLowerCase() != erc20.address.toLowerCase()) {
    console.error(`NAV Asset wrong !! Asset is ${navDenominationAsset}, but expected ${erc20.address} !!`);
  }

  console.log(`BlackOpal Fund NAV (On+Off-Chain): ${(await toStrUSDC(nav)).padStart(valuePadding)}`);
}

// TODO - add the required actions, rather than just logging.  e.g. Specify which Safe has balances or pending txns.
async function main() {
  console.log('Starting BlackOpal Fund Ops checks...');
  console.log();

  await logFundNav();

  console.log();

  const erc20Metadata: GetCurrencyMetadataResult = await erc20.getCurrencyMetadata();

  console.log(
    `Balances of ${credbullClient.chainConfig.chainName} '${erc20Metadata.name}' (${erc20Metadata.symbol}) at ${erc20.address}.`,
  );

  await logBalance('[Safe] Credbull Defi Custody         ', liquidStoneFund.fundApprovers.credbullDefiCustody);
  await logBalance('[Safe] BlackOpal Fund Owner Custody  ', liquidStoneFund.fundApprovers.blackOpalFundOwner);
  await logBalance('[Enzyme] BlackOpal LiquidStone Fund  ', liquidStoneFund.fundAddress);
  await logBalance('[Enzyme] BlackOpal LS Fund Flex Loan ', liquidStoneFund.fundFlexibleLoans[0].flexibleLoan);
  await logBalance(
    '[Safe] BlackOpal Fund Custody Wrapper',
    liquidStoneFund.fundApprovers.blackOpalFundCustodianWrapper,
  );

  console.log();

  console.log(`Safe Multi-Sig Pending Safe Transactions for approval.`);

  await logPendingSafeTxns('[Safe] Credbull Defi Custody         ', liquidStoneFund.fundApprovers.credbullDefiCustody);
  await logPendingSafeTxns('[Safe] BlackOpal Fund Owner Custody  ', liquidStoneFund.fundApprovers.blackOpalFundOwner);
  await logPendingSafeTxns(
    '[Safe] BlackOpal Fund Custody Wrapper',
    liquidStoneFund.fundApprovers.blackOpalFundCustodianWrapper,
  );

  console.log();

  console.log('BlackOpal Fund Ops checks completed!');
}

// Entry point: handle errors globally
main().catch((err) => {
  console.error('Error in BlackOpal Fund Ops !!', err);
  process.exit(1);
});
