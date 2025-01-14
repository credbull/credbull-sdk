import { SafeProvider } from '@safe-global/protocol-kit';

import { CredbullSafeClient } from '../../src/safe/credbull-safe-client';
import { Address, ChainConfig, baseSepoliaConfig } from '../../src/utils/utils';

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

export function safeClientSingleSigner(safeSigner: SafeProvider['signer'] | undefined): CredbullSafeClient {
  return new CredbullSafeClient(safeTestConfig.chainConfig, safeTestConfig.safeWithSingleSigner, safeSigner);
}

export function safeClientMultiSig(safeSigner: SafeProvider['signer'] | undefined): CredbullSafeClient {
  return new CredbullSafeClient(safeTestConfig.chainConfig, safeTestConfig.safeWithMultiSig, safeSigner);
}
