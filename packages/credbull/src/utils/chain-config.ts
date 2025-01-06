import { Address } from '@utils/rpc-types';
import { ChainOptions, arbitrumSepolia, baseSepolia } from 'thirdweb/chains';

export interface ChainConfig {
  chainName: string;
  chain: Readonly<ChainOptions & { rpc: string }>;
  usdc: Address;
}

export const baseSepoliaConfig: ChainConfig = {
  chainName: 'baseSepolia',
  chain: baseSepolia,
  usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
};

export const arbitrumSepoliaConfig: ChainConfig = {
  chainName: 'arbitrumSepolia',
  chain: arbitrumSepolia,
  usdc: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
};

// export const plumeTestnetConfig: ChainConfig = {
//   chainName: 'plumeTestnet',
//   chain: arbitrumSepolia,
//   usdc: '', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
// };

export const testnetConfig: ChainConfig = arbitrumSepoliaConfig;
