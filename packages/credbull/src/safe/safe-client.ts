import { SafeClient, createSafeClient } from '@safe-global/sdk-starter-kit';
import { Address } from '@utils/address';
import { loadConfig } from '@utils/config';
import { Eip1193Provider } from 'ethers';

loadConfig();

export async function connectSafe(
  provider: string | Eip1193Provider,
  safeAddress: Address,
  signerPrivateKey: string,
): Promise<SafeClient> {
  return await createSafeClient({
    provider: provider,
    signer: signerPrivateKey,
    safeAddress: safeAddress,
  });
}
