import { expect, test } from '@playwright/test';
import { toBigInt } from 'ethers';
import { Account } from 'thirdweb/wallets';
import { loadConfig } from 'tsconfig-paths';

import { CredbullClient } from '../../../src/credbull-client';
import { ERC20 } from '../../../src/erc20/erc20';
import {
  EnzymeConfig,
  FlexibleLoan,
  ManualValueOracle,
  calcFundNav,
  name,
  testEnzymePolygonConfig,
  totalSupply,
} from '../../../src/fund/enzyme/enzyme';

loadConfig();

const enzymeConfig: EnzymeConfig = testEnzymePolygonConfig;
const credbullClient: CredbullClient<EnzymeConfig> = new CredbullClient(enzymeConfig);

const minExpectedValue: number = 1;

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
    expect(supply).toBeGreaterThanOrEqual(minExpectedValue);
  });

  test('Test Total Supply - ERC20', async () => {
    const supply = await liquidStoneFund.totalSupply();
    expect(supply).toBeGreaterThanOrEqual(minExpectedValue);
  });
});

test.describe('Test LiquidStone Fund NAV', () => {
  test('Test Simulate LiquiteStone Fund NAV', async () => {
    const result: { navDenominationAsset: string; nav: number } = await calcFundNav(credbullClient);

    console.log(`NAV Denomination Asset: ${result.navDenominationAsset}, NAV: ${result.nav}`);
    expect(result.navDenominationAsset.toLowerCase()).toEqual(enzymeConfig.usdc.toLowerCase());
    expect(result.nav).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Test LiquidStone Fund Manual Value Oracle', () => {
  const flexibleLoan: FlexibleLoan = enzymeConfig.flexibleLoans[0];
  const manualValueOracle = new ManualValueOracle(credbullClient, flexibleLoan.manualValueOracleProxy);

  test('Test getters', async () => {
    expect(await manualValueOracle.getValue()).toBeGreaterThanOrEqual(minExpectedValue);
    const updater = await manualValueOracle.getUpdater();
    console.log(`updater: ${updater}`);
    expect(updater).toBeDefined();

    const owner = await manualValueOracle.getOwner();
    console.log(`owner: ${owner}`);
    expect(owner).toBeDefined();
  });
});

test.describe('Test LiquidStone Fund Manual Value Oracle - Write', () => {
  const flexibleLoan: FlexibleLoan = enzymeConfig.flexibleLoans[0];
  const manualValueOracle = new ManualValueOracle(credbullClient, flexibleLoan.manualValueOracleProxy);
  const deployer: Account = credbullClient.createAccount(process.env.DEPLOYER_PRIVATE_KEY as string);

  test('Test update value', async () => {
    const prevValue = await manualValueOracle.getValue();

    const newValue = prevValue == toBigInt(1) ? toBigInt(2) : toBigInt(1); // alternate value between 1 and 2

    console.log(`Manual Value Oracle updating value from ${prevValue} -> ${newValue}`);
    const txnReceipt = await manualValueOracle.updateValue(deployer, newValue);

    expect(txnReceipt.status).toBe('success');
  });

  // Skipping - this test needs the owner signer actually
  test.skip('Test set updater', async () => {
    const owner: Account = credbullClient.createAccount(process.env.OWNER_PRIVATE_KEY as string);
    const newUpdater = deployer.address; // need to keep the updater as deployer.  but txn should succeed.
    const txnReceipt = await manualValueOracle.setUpdater(owner, newUpdater);

    expect(txnReceipt.status).toBe('success');
  });
});
