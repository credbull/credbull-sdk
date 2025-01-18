import { simulateTransaction } from 'thirdweb';

import { CredbullClient } from '../../credbull-client';
import { CredbullContract } from '../../credbull-contract';
import { Address } from '../../utils/rpc-types';

import { EnzymeConfig } from './enzyme-config';
import { calcNav as calcNavExt } from './extensions/fund-value-calculator.codegen';

export async function calcFundNav(credbullClient: CredbullClient<EnzymeConfig>) {
  const fundValueCalculator = new CredbullContract(credbullClient, credbullClient.chainConfig.fundValueCalculator);

  const navTxn = calcNavExt({
    contract: fundValueCalculator.contract,
    vaultProxy: credbullClient.chainConfig.liquidStoneFund,
  });

  const [navDenominationAsset, nav]: [Address, number] = await simulateTransaction({
    transaction: navTxn,
  });

  return { navDenominationAsset, nav };
}

export * from './enzyme-config';
export * from './extensions/fund-value-calculator.codegen';
export * from './extensions/manual-value-oracle';
export * from './extensions/vault.codegen';
