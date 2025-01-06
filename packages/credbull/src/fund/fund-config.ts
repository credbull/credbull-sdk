import { ChainConfig } from '@utils/chain-config';
import { Address } from '@utils/rpc-types';
import { polygon } from 'thirdweb/chains';

export interface FundConfig extends ChainConfig {
  liquidStoneFund: Address;
}

const polygonFundConfigBase = {
  chainName: polygon.name || 'polygon',
  chain: polygon,
  usdc: '0x3c499c542cef5e3811e1192ce70d8cc03d5c3359', // see: https://developers.circle.com/stablecoins/usdc-on-main-networks
  liquidStone: '', // liquidStone DeFi not deployed to polygon
};

export const polygonFundConfig: FundConfig = {
  ...polygonFundConfigBase,
  liquidStoneFund: '0x2eda17eb596858566be933b26fae6fa4ee8ccd6d', // see: https://app.enzyme.finance/vault/0x2eda17eb596858566be933b26fae6fa4ee8ccd6d?network=polygon
};

export const polygonDemoFundConfig: FundConfig = {
  ...polygonFundConfigBase,
  liquidStoneFund: '0xc6024bb5d1d3379943f0193aff7a2ca55f02ba21', // test / preview fund.  see: https://app.enzyme.finance/vault/0xc6024bb5d1d3379943f0193aff7a2ca55f02ba21?network=polygon
};
