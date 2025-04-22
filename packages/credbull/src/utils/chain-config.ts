import { defineChain } from 'thirdweb';
import { ChainOptions, anvil, arbitrumSepolia, baseSepolia, polygonAmoy } from 'thirdweb/chains';

import { Address } from './utils';

export interface ChainConfig {
  chainName: string;
  chain: Readonly<ChainOptions & { rpc: string }>;
  usdc: Address;
  liquidStone: Address; // LiquidStone product proxy contraact address
}

export const baseSepoliaConfig: ChainConfig = {
  chainName: baseSepolia.name || 'baseSepolia',
  chain: {
    ...baseSepolia,
    rpc: 'https://sepolia.base.org',
  },
  usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
  liquidStone: '',
};

export const arbitrumSepoliaConfig: ChainConfig = {
  chainName: arbitrumSepolia.name || 'arbitrumSepolia',
  chain: arbitrumSepolia,
  usdc: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
  liquidStone: '0x111B6a3dbacE7F0b32bAad47027907765e88ABd2',
};

export const polygonAmoyConfig: ChainConfig = {
  chainName: polygonAmoy.name || 'polygonAmoy',
  chain: polygonAmoy,
  usdc: '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
  liquidStone: '0xFbE87E74028389789948Ed009296198dB686da8A',
};

export const anvilConfig: ChainConfig = {
  chainName: anvil.name || 'anvil',
  chain: anvil,
  usdc: '', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
  liquidStone: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', // V3 - deploy, probably different
};

const plumeLegacyMainnet = defineChain({
  name: 'Plume Legacy (ETH)',
  id: 98865,
  rpc: 'https://rpc.plumenetwork.xyz',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'plume explorer (Blockscout)',
      url: 'https://explorer.plumenetwork.xyz',
      apiUrl: 'https://explorer.plumenetwork.xyz/api\\?',
    },
  ],
});

const plumeLegacyTestnet = defineChain({
  name: 'Plume Legacy Testnet (ETH)',
  id: 98864,
  rpc: 'https://test-rpc.plumenetwork.xyz',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'plume testnet explorer (Blockscout)',
      url: 'https://test-explorer.plumenetwork.xyz',
      apiUrl: 'https://test-explorer.plumenetwork.xyz/api\\?',
    },
  ],
});

export const plumeTestnet98864Config: ChainConfig = {
  chainName: plumeLegacyTestnet.name || 'plumeLegacyTestnet',
  chain: plumeLegacyTestnet,
  usdc: '0x401eCb1D350407f13ba348573E5630B83638E30D',
  liquidStone: '0x4B1fC984F324D2A0fDD5cD83925124b61175f5C6',
};

export const plumeLegacyMainetConfig: ChainConfig = {
  chainName: plumeLegacyMainnet.name || 'plume',
  chain: plumeLegacyMainnet,
  usdc: '0x3938A812c54304fEffD266C7E2E70B48F9475aD6',
  liquidStone: '0x2b9d2023DbF3c7473f1cec42F78713d09DdC9FBF',
};

export const testnetConfig: ChainConfig = arbitrumSepoliaConfig;
