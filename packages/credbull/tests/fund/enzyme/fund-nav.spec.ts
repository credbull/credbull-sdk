import { expect, test } from '@playwright/test';
import { CredbullClient } from '@src/credbull-client';
import { CredbullContract } from '@src/credbull-contract';
import { ERC20 } from '@src/erc20/erc20';
import { EnzymeConfig, FlexibleLoan, testEnzymePolygonConfig } from '@src/fund/enzyme/enzyme-config';
import { calcNav } from '@src/fund/enzyme/extensions/fund-value-calculator.codegen';
import { getUpdater, getValue, updateValueTxn } from '@src/fund/enzyme/extensions/manual-value-oracle-lib';
import { name, totalSupply } from '@src/fund/enzyme/extensions/vault.codegen';
import { loadConfig } from '@utils/config';
import { Address } from '@utils/rpc-types';
import { toBigInt } from 'ethers';
import { sendTransaction, simulateTransaction, waitForReceipt } from 'thirdweb';
import { Account } from 'thirdweb/wallets';

loadConfig();

const enzymeConfig: EnzymeConfig = testEnzymePolygonConfig;
const credbullClient = new CredbullClient(enzymeConfig);

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

test.describe('Test LiquidStone Fund Manual Value Oracle', () => {
  const flexibleLoan: FlexibleLoan = enzymeConfig.flexibleLoans[0];
  const manualValueOracle = new CredbullContract(credbullClient, flexibleLoan.manualValueOracleProxy);

  test('Test getters', async () => {
    const value = await getValue({
      contract: manualValueOracle.contract,
    });
    expect(value).toBeGreaterThanOrEqual(minExpectedValue);

    const updater = await getUpdater({
      contract: manualValueOracle.contract,
    });
    expect(updater).toBeDefined();
  });

  test('Test update value', async () => {
    const prevValue = await getValue({
      contract: manualValueOracle.contract,
    });

    const newValue = prevValue == toBigInt(1) ? toBigInt(2) : toBigInt(1); // alternate value between 1 and 2
    const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY as string;
    const deployer: Account = credbullClient.createAccount(deployerPrivateKey);

    const updatevalueTxn = updateValueTxn({
      contract: manualValueOracle.contract,
      nextValue: newValue,
    });

    console.log(`Updating value from ${prevValue} -> ${newValue}`);

    try {
      const txnResult = await sendTransaction({
        account: deployer, // the account initiating the transaction
        transaction: updatevalueTxn,
      });

      const txnReceipt = await waitForReceipt(txnResult);
      expect(txnReceipt.status).toBe('success');
    } catch (error) {
      console.error('Error sending deposit transaction:', error);
      throw error;
    }
  });
});
