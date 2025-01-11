import { polygon } from 'thirdweb/chains';

import { Address, ChainConfig } from '../../utils/utils';

// Enzyme Polygon Deploys: https://github.com/enzymefinance/sdk/blob/main/packages/environment/src/deployments/polygon.ts#L157
export interface EnzymeConfig extends ChainConfig {
  liquidStoneFund: Address;
  liquidSToneFundApprovers: Approvers;
  fundValueCalculator: Address;
  flexibleLoans: FlexibleLoan[];
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

const enzymePolygonConfigBase = {
  chainName: polygon.name || 'polygon',
  chain: polygon, // chaind 137
  usdc: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359', // see: https://developers.circle.com/stablecoins/usdc-on-main-networks
  liquidStone: '', // liquidStone DeFi not deployed to polygon
  fundValueCalculator: '0xcdf038dd3b66506d2e5378aee185b2f0084b7a33',
};

export const enzymePolygonConfig: EnzymeConfig = {
  ...enzymePolygonConfigBase,
  liquidStoneFund: '0x2eda17eb596858566be933b26fae6fa4ee8ccd6d', // see: https://app.enzyme.finance/vault/0x2eda17eb596858566be933b26fae6fa4ee8ccd6d?network=polygon
  liquidSToneFundApprovers: {
    credbullDefiCustody: '0xD2071c01d243CED66521B14aC717B97a71b5a1B1',
    blackOpalFundOwner: '0x7E6A4Be1877c6298440aCBCCDC6fE862d97e1E51',
    blackOpalFundCustodianWrapper: '0xB1dc50Da4FB51A74520E0fe5C83e8a1320eB0bf6',
  },
  flexibleLoans: [
    {
      name: 'BlackOpal LiquidStone x Plume 2024',
      flexibleLoan: '0xe53b5173e1a89e5923c96f5efb35bc292144657c',
      manualValueOracleProxy: '0x79ec25cBBf6E93C5bF327100FCA4B8D8b1619481',
    },
  ],
};

export const testEnzymePolygonConfig: EnzymeConfig = {
  ...enzymePolygonConfigBase,
  liquidStoneFund: '0xc6024bb5d1d3379943f0193aff7a2ca55f02ba21', // test / preview fund.  see: https://app.enzyme.finance/vault/0xc6024bb5d1d3379943f0193aff7a2ca55f02ba21?network=polygon
  liquidSToneFundApprovers: {
    credbullDefiCustody: '0x555d341316B75B097cD9089127631194dd921568',
    blackOpalFundOwner: '0xC52D5F1DdF6742C1D658bC03CE1Af8e188E5c048',
    blackOpalFundCustodianWrapper: '0xC52D5F1DdF6742C1D658bC03CE1Af8e188E5c048', // same as blackOpalFund owner
  },
  flexibleLoans: [
    {
      name: 'TEST - BlackOpal Test Vault Flexible Loan 20241218',
      flexibleLoan: '0x9144066ddff9ae04aa3ef3af766c8c774781f01b',
      manualValueOracleProxy: '0x5eAe7fcA6Bb5bA22cdEAEfCB08a3d351B6DCC4C1',
    },
  ],
};
