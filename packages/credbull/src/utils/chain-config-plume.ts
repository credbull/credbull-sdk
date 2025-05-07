import { defineChain } from 'thirdweb';
import * as chains from 'viem/chains';

import { ChainConfig } from './utils';

const plumeMainnet = defineChain(chains.plumeMainnet);

const plumeTestnet = defineChain(chains.plumeSepolia);

/** @deprecated */
const plumeLegacyMainnet = defineChain(chains.plume);

/** @deprecated */
const plumeLegacyTestnet = defineChain(chains.plumeDevnet);

export const plumeMainetConfig: ChainConfig = {
  chainName: plumeMainnet.name || 'plume',
  chain: plumeMainnet,
  usdc: '0x78adD880A697070c1e765Ac44D65323a0DcCE913', // USDC.e
  liquidStone: '0x577349C99830D3c078034087A532581EF5381A08',
};

export const plumeTestnetConfig: ChainConfig = {
  chainName: plumeTestnet.name || 'plumeTestnet',
  chain: plumeTestnet,
  usdc: '0x49Cf9c846A796D22a1e1465Ae4afc4f4ba88e0C8', // Testnet SimpleUSDC
  liquidStone: '0x82D7f1E6DC243Acba12B7bdAeA27d053f1799015',
};

/** @deprecated */
export const plumeLegacyMainetConfig: ChainConfig = {
  chainName: plumeLegacyMainnet.name || 'plumeLegacy',
  chain: plumeLegacyMainnet,
  usdc: '0x3938A812c54304fEffD266C7E2E70B48F9475aD6',
  liquidStone: '0x2b9d2023DbF3c7473f1cec42F78713d09DdC9FBF',
};

/** @deprecated */
export const plumeLegacyTestnetConfig: ChainConfig = {
  chainName: plumeLegacyTestnet.name || 'plumeLegacyTestnet',
  chain: plumeLegacyTestnet,
  usdc: '0x401eCb1D350407f13ba348573E5630B83638E30D', // Testnet USDC.e
  liquidStone: '0x4B1fC984F324D2A0fDD5cD83925124b61175f5C6',
};
