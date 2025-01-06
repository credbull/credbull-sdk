import { ChainConfig } from '@utils/chain-config';
import { Address } from '@utils/rpc-types';
import { polygon } from 'thirdweb/chains';

// Enzyme Polygon Deploys: https://github.com/enzymefinance/sdk/blob/main/packages/environment/src/deployments/polygon.ts#L157
export interface EnzymeConfig extends ChainConfig {
  liquidStoneFund: Address;
  fundValueCalculator: Address;
  flexibleLoans: FlexibleLoan[];
}

export interface FlexibleLoan {
  name: string;
  flexibleLoan: Address;
  manualValueOracleProxy: Address;
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
  flexibleLoans: [
    {
      name: 'TEST - BlackOpal Test Vault Flexible Loan 20241218',
      flexibleLoan: '0x9144066ddff9ae04aa3ef3af766c8c774781f01b',
      manualValueOracleProxy: '0x5eAe7fcA6Bb5bA22cdEAEfCB08a3d351B6DCC4C1',
    },
  ],
};
