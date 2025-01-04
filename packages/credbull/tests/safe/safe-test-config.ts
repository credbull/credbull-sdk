import { Address } from '@utils/address';
import { ChainOptions, baseSepolia } from 'thirdweb/chains';

interface SafeTestConfig {
  chainName: string;
  chain: Readonly<ChainOptions & { rpc: string }>;
  usdc: Address;

  safeWithSingleSigner: Address;
  safeWithMultiSig: Address;
}

export const baseSepoliaConfig: SafeTestConfig = {
  chainName: 'baseSepolia',
  chain: baseSepolia,
  usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', //https://base-sepolia.blockscout.com/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e

  safeWithSingleSigner: '0x40AD1Ae6EdBb0F6DD8837b2d52680A2046A0628b',
  safeWithMultiSig: '0xE8aD45571A667E7cF7E976842BDabE0Eb87D8F68',
};
