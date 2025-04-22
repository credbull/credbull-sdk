import { defineChain } from 'thirdweb';

import { ChainConfig } from './utils';

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

export const plumeLegacyTestnetConfig: ChainConfig = {
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
