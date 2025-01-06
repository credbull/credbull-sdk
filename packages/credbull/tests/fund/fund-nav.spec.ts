import { expect, test } from '@playwright/test';
import { CredbullClient } from '@src/credbull-client';
import { ERC20 } from '@src/erc20/erc20';
import { name, totalSupply } from '@src/fund/enzyme-vault-generated';
import { FundConfig, polygonFundConfig } from '@src/fund/fund-config';
import { loadConfig } from '@utils/config';
import { totalAssets } from 'thirdweb/extensions/erc4626';

loadConfig();

//const fundChainConfig = polygonDemoFundConfig;
const fundChainConfig: FundConfig = polygonFundConfig;

// Write & Simulate Operations, see https://portal.thirdweb.com/typescript/v5/transactions/send
test.describe('Test LiquidStone Deposit & Redeem', () => {
  const credbullClient = new CredbullClient(fundChainConfig);
  const liquidStoneFund: ERC20 = new ERC20(credbullClient, fundChainConfig.liquidStoneFund);

  test('Test Name', async () => {
    const vaultName = await name({
      contract: liquidStoneFund.contract,
    });

    console.log(`vaultName: ${vaultName}`);
    expect(vaultName).toBeDefined();
  });

  test('Test Total Supply - Generated', async () => {
    const supply = await totalSupply({
      contract: liquidStoneFund.contract,
    });
    console.log(`totalSupply: ${supply}`);
    expect(supply).toBeGreaterThanOrEqual(1);
  });

  test('Test Total Supply - ERC20', async () => {
    const supply = await liquidStoneFund.totalSupply();
    console.log(`totalSupply: ${supply}`);
    expect(supply).toBeGreaterThanOrEqual(1);
  });

  // TODO - reverts - Enzyme not an ERC4626 ?!?!
  test.skip('Test Total Assets', async () => {
    try {
      const assets = await totalAssets({
        contract: liquidStoneFund.contract,
      });

      console.log(`totalAssets: ${totalAssets}`);
      expect(assets).toBeGreaterThanOrEqual(1);
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});
