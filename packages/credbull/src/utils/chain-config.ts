import { ChainOptions, anvil, arbitrumSepolia, baseSepolia, polygon, polygonAmoy } from 'thirdweb/chains';

import { loadConfiguration } from './config';
import { Address } from './utils';

const envConfig = loadConfiguration();

export interface ChainConfig {
  chainName: string;
  chain: Readonly<ChainOptions & { rpc: string }>;
  usdc: Address;
  liquidStone: Address; // LiquidStone product proxy contract address
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
  chain: {
    ...arbitrumSepolia,
    rpc: `https://arb-sepolia.g.alchemy.com/v2/${envConfig.secret.alchemyApiKey.valueOf()}`,
  },
  usdc: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
  liquidStone: '0x111B6a3dbacE7F0b32bAad47027907765e88ABd2',
};

export const polygonConfig: ChainConfig = {
  chainName: polygon.name || 'polygon',
  chain: {
    ...polygon,
    rpc: `https://polygon-mainnet.g.alchemy.com/v2/${envConfig.secret.alchemyApiKey.valueOf()}`,
  },
  usdc: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359', // see: https://developers.circle.com/stablecoins/usdc-on-main-networks
  liquidStone: '', // liquidStone not on Polygon
};

export const polygonAmoyConfig: ChainConfig = {
  chainName: polygonAmoy.name || 'polygonAmoy',
  chain: {
    ...polygonAmoy,
    rpc: `https://polygon-amoy.g.alchemy.com/v2/${envConfig.secret.alchemyApiKey.valueOf()}`,
  },
  usdc: '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
  liquidStone: '0xFbE87E74028389789948Ed009296198dB686da8A',
};

export const anvilConfig: ChainConfig = {
  chainName: anvil.name || 'anvil',
  chain: anvil,
  usdc: '', // see: https://developers.circle.com/stablecoins/usdc-on-test-networks
  liquidStone: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9', // V3 - deploy, probably different
};

export const testnetConfig: ChainConfig = arbitrumSepoliaConfig;

export * from './chain-config-plume';
