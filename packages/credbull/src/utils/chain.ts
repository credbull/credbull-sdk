import { ChainOptions, arbitrumSepolia } from 'thirdweb/chains';

export const chain: Readonly<ChainOptions & { rpc: string }> = arbitrumSepolia;
