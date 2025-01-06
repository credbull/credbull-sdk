import { CredbullSafeClient } from '@src/safe/credbull-safe-client';
import { ChainConfig, baseSepoliaConfig } from '@utils/chain-config';
import { Address } from '@utils/rpc-types';

interface SafeTestConfig {
  chainConfig: ChainConfig;
  safeWithSingleSigner: Address;
  safeWithMultiSig: Address;
}

export const safeTestConfig: SafeTestConfig = {
  chainConfig: baseSepoliaConfig,
  safeWithSingleSigner: '0x40AD1Ae6EdBb0F6DD8837b2d52680A2046A0628b',
  safeWithMultiSig: '0xE8aD45571A667E7cF7E976842BDabE0Eb87D8F68',
};

export function safeClientSingleSigner(signerPrivateKey: string): CredbullSafeClient {
  return new CredbullSafeClient(safeTestConfig.chainConfig, safeTestConfig.safeWithSingleSigner, signerPrivateKey);
}

export function safeClientMultiSig(signerPrivateKey: string): CredbullSafeClient {
  return new CredbullSafeClient(safeTestConfig.chainConfig, safeTestConfig.safeWithMultiSig, signerPrivateKey);
}
