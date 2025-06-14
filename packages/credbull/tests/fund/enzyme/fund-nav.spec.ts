import { expect, test } from '@playwright/test';
import { toBigInt } from 'ethers';
import { Account } from 'thirdweb/wallets';
import { encodePacked, pad } from 'viem';

import { loadConfiguration } from '../../../src';
import { CredbullClient } from '../../../src/credbull-client';
import { ERC20 } from '../../../src/erc20/erc20';
import {
  EnzymeConfig,
  EnzymeFundConfig,
  FlexibleLoan,
  ManualValueOracle,
  calcFundNav,
  name,
  testEnzymePolygonConfig,
  totalSupply,
} from '../../../src/fund/enzyme/enzyme';

const envConfig = loadConfiguration();

const enzymeConfig: EnzymeConfig = testEnzymePolygonConfig;
const enzymeFundConfig: EnzymeFundConfig = enzymeConfig.liquidStoneFund;

const credbullClient: CredbullClient<EnzymeConfig> = new CredbullClient(enzymeConfig);

const minExpectedValue: number = 1;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test BlackOpal Fund Read', () => {
  const liquidStoneFund: ERC20 = new ERC20(credbullClient, enzymeFundConfig.fundAddress);

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

test.describe('Test BlackOpal Fund NAV', () => {
  test('Test Simulate LiquidStone Fund NAV', async () => {
    const result: { navDenominationAsset: string; nav: number } = await calcFundNav(
      credbullClient,
      enzymeFundConfig.fundAddress,
    );

    console.log(`NAV Denomination Asset: ${result.navDenominationAsset}, NAV: ${result.nav}`);
    expect(result.navDenominationAsset.toLowerCase()).toEqual(enzymeConfig.usdc.toLowerCase());
    expect(result.nav).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Test BlackOpal Fund Manual Value Oracle', () => {
  const flexibleLoan: FlexibleLoan = enzymeFundConfig.fundFlexibleLoans[0];
  const manualValueOracle = new ManualValueOracle(credbullClient, flexibleLoan.manualValueOracleProxy);

  test('Test getters', async () => {
    const oracleValue = await manualValueOracle.getValue();
    expect(oracleValue).toBeGreaterThanOrEqual(minExpectedValue);
    console.log(`oracleValue: ${oracleValue}`);

    const updater = await manualValueOracle.getUpdater();
    console.log(`updater: ${updater}`);
    expect(updater).toBeDefined();

    const owner = await manualValueOracle.getOwner();
    console.log(`owner: ${owner}`);
    expect(owner).toBeDefined();
  });

  test('Encode oracle description', async () => {
    const description = 'credbull testing - 20241209';

    const packed = encodePacked(['string'], [description]);
    const padded = pad(packed, { size: 32, dir: 'right' }); // right pad to 32 bytes

    const expectedBytes32 = '0x6372656462756c6c2074657374696e67202d2032303234313230390000000000';

    expect(padded).toEqual(expectedBytes32);
  });
});

test.describe('Test BlackOpal Fund Manual Value Oracle - Write', () => {
  const flexibleLoan: FlexibleLoan = enzymeFundConfig.fundFlexibleLoans[0];
  const manualValueOracle = new ManualValueOracle(credbullClient, flexibleLoan.manualValueOracleProxy);
  const deployer: Account = credbullClient.createAccount(envConfig.secret.deployerPrivateKey);

  const TEN_CENTS: bigint = toBigInt(100_000);
  const TWENTY_CENTS: bigint = toBigInt(200_000);

  test('Test update value', async () => {
    const prevValue = await manualValueOracle.getValue();

    const newValue = prevValue == TEN_CENTS ? TWENTY_CENTS : TEN_CENTS; // alternate values

    console.log(`Manual Value Oracle updating value from ${prevValue} -> ${newValue}`);
    const txnReceipt = await manualValueOracle.updateValue(deployer, newValue);

    expect(txnReceipt.status).toBe('success');
  });

  // Skipping - this test needs the owner signer actually
  test.skip('Test set updater', async () => {
    const owner: Account = credbullClient.createAccount(envConfig.secret.deployerPrivateKey); // owner account - truly secret

    const newUpdater = deployer.address; // need to keep the updater as deployer.  but txn should succeed.
    const txnReceipt = await manualValueOracle.setUpdater(owner, newUpdater);
    expect(txnReceipt.status).toBe('success');
  });
});
