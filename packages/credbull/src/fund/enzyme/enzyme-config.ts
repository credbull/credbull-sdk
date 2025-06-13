import { Address, ChainConfig, polygonConfig } from '../../utils/utils';

// Enzyme Polygon Deploys: https://github.com/enzymefinance/sdk/blob/main/packages/environment/src/deployments/polygon.ts#L157
export interface EnzymeConfig extends ChainConfig {
  liquidStoneFund: EnzymeFundConfig;
  liquidStonePlumeLegacyFund?: EnzymeFundConfig; //  deposits from "old" Plume Legacy mainnet
  pureStoneFundUSDC?: EnzymeFundConfig;
  pureStoneFundUSDT?: EnzymeFundConfig;
  fundValueCalculator: Address;
}

export interface EnzymeFundConfig {
  fundName: string;
  fundAddress: Address;
  fundApprovers: Approvers;
  fundFlexibleLoans: FlexibleLoan[];
}

export interface FlexibleLoan {
  name: string;
  flexibleLoan: Address;
  manualValueOracleProxy: Address;
}

export interface Approvers {
  credbullDefiCustody: Address; // Temp custody for assets.  Handles deposits to and redemptions from the Fund.  Holds assets to bridge to and from Polygon.
  blackOpalFundOwner: Address; // Manages the on-chain fund structure, including deposits, balances, redemptions, and fund NAV.
  blackOpalFundCustodianWrapper: Address; // Wraps the BitGo custodial wallet for interaction with DeFi protocols (e.g. Enzyme)
}

export const enzymePolygonApprovers: Approvers = {
  credbullDefiCustody: '0xD2071c01d243CED66521B14aC717B97a71b5a1B1',
  blackOpalFundOwner: '0x7E6A4Be1877c6298440aCBCCDC6fE862d97e1E51',
  blackOpalFundCustodianWrapper: '0xB1dc50Da4FB51A74520E0fe5C83e8a1320eB0bf6',
};

export const enzymePolygonConfig: EnzymeConfig = {
  ...polygonConfig,
  fundValueCalculator: '0xcdf038dd3b66506d2e5378aee185b2f0084b7a33',

  liquidStoneFund: {
    fundName: 'BlackOpal - LiquidStone X Plume ($PLUME) 2025', // SYMBOL BOLSPT25
    fundAddress: '0xd54bce9ce3e0d38b1776c1c66d43bae1abc152af', // see:https://app.enzyme.finance/vault/0xd54bce9ce3e0d38b1776c1c66d43bae1abc152af?network=polygon
    fundApprovers: enzymePolygonApprovers,
    fundFlexibleLoans: [
      {
        name: 'BlackOpal - LiquidStone X Plume ($PLUME) 2025 (PrimeVault)',
        flexibleLoan: '0xb8802f76ecf747a51b6dccc5215ba793097f9014',
        manualValueOracleProxy: '0xb2b9CABB04c8C795FbAC81EAFe9D618c0c2F31c7',
      },
      {
        name: 'BlackOpal - LiquidStone X Plume ($PLUME) 2025 (Safe)',
        flexibleLoan: '0xa3c943adf9e8b4add86586e2037cfdc14d124363',
        manualValueOracleProxy: '0x7e9BaDb9339f6461bdd128cdD98F61ceE67dd772',
      },
    ],
  },

  liquidStonePlumeLegacyFund: {
    fundName: 'BlackOpal - LiquidStone X Plume Legacy (ETH) 2024', // SYMBOL BOLSPT24
    fundAddress: '0x2eda17eb596858566be933b26fae6fa4ee8ccd6d', // see: https://app.enzyme.finance/vault/0x2eda17eb596858566be933b26fae6fa4ee8ccd6d?network=polygon
    fundApprovers: enzymePolygonApprovers,
    fundFlexibleLoans: [
      {
        name: 'BlackOpal LiquidStone x Plume 2024',
        flexibleLoan: '0xe53b5173e1a89e5923c96f5efb35bc292144657c',
        manualValueOracleProxy: '0x79ec25cBBf6E93C5bF327100FCA4B8D8b1619481',
      },
    ],
  },

  pureStoneFundUSDC: {
    fundName: 'BlackOpal - PureStone',
    fundAddress: '0xd93e3793471e22f2806bc3e0447fc46fb509390b', // see: https://app.enzyme.finance/vault/0xd93e3793471e22f2806bc3e0447fc46fb509390b?network=polygon
    fundApprovers: enzymePolygonApprovers,
    fundFlexibleLoans: [
      {
        name: 'BlackOpal PureStone 2025',
        flexibleLoan: '0x99185097c97f20879fded74ea65c0c71de47ca7f',
        manualValueOracleProxy: '0x4627449ECCABdb8A4c72e20AED0F655C41d26ba2',
      },
    ],
  },

  pureStoneFundUSDT: {
    fundName: 'BlackOpal - PureStone USDT',
    fundAddress: '0xd1bd301397bf9623a5696f4fdeced13a47888d65', // see: https://app.enzyme.finance/vault/0xd1bd301397bf9623a5696f4fdeced13a47888d65?network=polygon
    fundApprovers: enzymePolygonApprovers,
    fundFlexibleLoans: [
      {
        name: 'BlackOpal PureStone USDT 2025',
        flexibleLoan: '0x6c1e5157c29a07d54a5caf2f1852b6890223504c',
        manualValueOracleProxy: '0x974dc84299eF67282a68f4EecE8bAb7BD6646558',
      },
    ],
  },
};

export const testEnzymePolygonConfig: EnzymeConfig = {
  ...polygonConfig,
  fundValueCalculator: '0xcdf038dd3b66506d2e5378aee185b2f0084b7a33',
  liquidStoneFund: {
    fundName: 'TEST - BlackOpal Test Vault Flexible Loan 20241218',
    fundAddress: '0xc6024bb5d1d3379943f0193aff7a2ca55f02ba21', // test / preview fund.  see: https://app.enzyme.finance/vault/0xc6024bb5d1d3379943f0193aff7a2ca55f02ba21?network=polygon
    fundApprovers: {
      credbullDefiCustody: '0x555d341316B75B097cD9089127631194dd921568',
      blackOpalFundOwner: '0xC52D5F1DdF6742C1D658bC03CE1Af8e188E5c048',
      blackOpalFundCustodianWrapper: '0xC52D5F1DdF6742C1D658bC03CE1Af8e188E5c048', // same as blackOpalFund owner
    },
    fundFlexibleLoans: [
      {
        name: 'TEST - BlackOpal Test Vault Flexible Loan 20241218',
        flexibleLoan: '0x9144066ddff9ae04aa3ef3af766c8c774781f01b',
        manualValueOracleProxy: '0x5eAe7fcA6Bb5bA22cdEAEfCB08a3d351B6DCC4C1',
      },
      {
        name: 'TEST - BlackOpal Test Vault Flexible Loan 20250613',
        flexibleLoan: '0x3179e50984e153de6162dd2efa0acf3f202b5805',
        manualValueOracleProxy: '0xdE0E43850AbFb98F549CfC2ec571FDC02E8C053a',
      },
    ],
  },
};
