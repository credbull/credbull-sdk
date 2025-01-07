import { expect, test } from '@playwright/test';
import { CredbullClient } from '@src/credbull-client';
import { CredbullContract } from '@src/credbull-contract';
import { ERC20 } from '@src/erc20/erc20';
import { EnzymeConfig, enzymePolygonConfig } from '@src/fund/enzyme/enzyme-config';
import { calcNav } from '@src/fund/enzyme/extensions/fund-value-calculator.codegen';
import { name, totalSupply } from '@src/fund/enzyme/extensions/vault.codegen';
import { loadConfig } from '@utils/config';
import { Address } from '@utils/rpc-types';
import { simulateTransaction } from 'thirdweb';

loadConfig();

//const enzymeConfig = polygonDemoFundConfig;
const enzymeConfig: EnzymeConfig = enzymePolygonConfig;
const credbullClient = new CredbullClient(enzymeConfig);

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test LiquidStone Fund Read', () => {
  const liquidStoneFund: ERC20 = new ERC20(credbullClient, enzymeConfig.liquidStoneFund);

  test('Test Name', async () => {
    const vaultName = await name({
      contract: liquidStoneFund.contract,
    });

    expect(vaultName).toContain('BlackOpal');
  });

  test('Test Total Supply', async () => {
    const supply = await totalSupply({
      contract: liquidStoneFund.contract,
    });
    expect(supply).toBeGreaterThanOrEqual(1);
  });

  test('Test Total Supply - ERC20', async () => {
    const supply = await liquidStoneFund.totalSupply();
    expect(supply).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Test LiquidStone Fund NAV', () => {
  test('Test Simulate LiquiteStone Fund NAV', async () => {
    const fundValueCalculator = new CredbullContract(credbullClient, enzymeConfig.fundValueCalculator);

    const navTxn = calcNav({
      contract: fundValueCalculator.contract,
      vaultProxy: enzymeConfig.liquidStoneFund,
    });

    const [navDenominationAsset, nav]: [Address, number] = await simulateTransaction({
      transaction: navTxn,
    });

    console.log(`NAV Denomination Asset: ${navDenominationAsset}, NAV: ${nav}`);
    expect(navDenominationAsset.toLowerCase()).toEqual(enzymeConfig.usdc.toLowerCase());
    expect(nav).toBeGreaterThanOrEqual(1);
  });
});
