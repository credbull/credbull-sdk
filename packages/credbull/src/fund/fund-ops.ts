import { simulateTransaction } from 'thirdweb';
import { GetCurrencyMetadataResult } from 'thirdweb/dist/types/extensions/erc20/read/getCurrencyMetadata';

import { CredbullClient } from '../credbull-client';
import { CredbullContract } from '../credbull-contract';
import { ERC20 } from '../erc20/erc20';
import { toStrUSDC } from '../utils/format';
import { Address } from '../utils/utils';

import { EnzymeConfig, enzymePolygonConfig } from './enzyme/enzyme-config';
import { calcNav } from './enzyme/extensions/fund-value-calculator.codegen';

const enzymeConfig: EnzymeConfig = enzymePolygonConfig;

const credbullClient = new CredbullClient(enzymeConfig);
const erc20: ERC20 = new ERC20(credbullClient, enzymeConfig.usdc);

const valuePadding = 25;

async function logBalance(holderName: string, owner: Address) {
  console.log(`-- ${holderName}: ${(await toStrUSDC(await erc20.balanceOf(owner))).padStart(valuePadding)}`);
}

async function logFundNav() {
  const fundValueCalculator = new CredbullContract(credbullClient, enzymeConfig.fundValueCalculator);

  const navTxn = calcNav({
    contract: fundValueCalculator.contract,
    vaultProxy: enzymeConfig.liquidStoneFund,
  });

  const [navDenominationAsset, nav]: [Address, number] = await simulateTransaction({
    transaction: navTxn,
  });

  if (navDenominationAsset.toLowerCase() != erc20.address.toLowerCase()) {
    console.error(`NAV Asset wrong !! Asset is ${navDenominationAsset}, but expected ${erc20.address} !!`);
  }

  console.log(`BlackOpal Fund NAV (On+Off-Chain): ${(await toStrUSDC(nav)).padStart(valuePadding)}`);
}

async function main() {
  console.log('Starting BlackOpal Fund Ops checks...');
  console.log();

  const erc20Metadata: GetCurrencyMetadataResult = await erc20.getCurrencyMetadata();

  console.log(
    `Balances of ${credbullClient.chainConfig.chainName} '${erc20Metadata.name}' (${erc20Metadata.symbol}) at ${erc20.address}.`,
  );

  await logBalance('Credbull Defi Custody         ', enzymeConfig.liquidSToneFundApprovers.credbullDefiCustody);
  await logBalance('BlackOpal Fund Owner Custody  ', enzymeConfig.liquidSToneFundApprovers.blackOpalFundOwner);
  await logBalance('BlackOpal LiquidStone Fund    ', enzymeConfig.liquidStoneFund);
  await logBalance('BlackOpal LS Fund Flex Loan   ', enzymeConfig.flexibleLoans[0].flexibleLoan);
  await logBalance(
    'BlackOpal Fund Custody Wrapper',
    enzymeConfig.liquidSToneFundApprovers.blackOpalFundCustodianWrapper,
  );

  // TODO - log any pending Safe transactions requiring co-signing

  console.log();

  await logFundNav();

  console.log();

  console.log('BlackOpal Fund Ops checks completed!');
}

// Entry point: handle errors globally
main().catch((err) => {
  console.error('Error in BlackOpal Fund Ops !!', err);
  process.exit(1);
});
