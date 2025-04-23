import { expect, test } from '@playwright/test';
import path from 'path';
import { download, upload } from 'thirdweb/storage';

import { ChainConfig, CredbullClient, testnetConfig } from '../../src';
import fs from 'fs/promises';

const chainConfig: ChainConfig = testnetConfig;
const credbullClient: CredbullClient = new CredbullClient(chainConfig);

const sampleFile = path.resolve(__dirname, './sample_1.csv');

// see: https://portal.thirdweb.com/typescript/v5/storage
test.describe('Test IPFS', () => {
  test('Test IPFS download', async () => {
    const ipfsResponse = await download({
      client: credbullClient.thirdWebClient,
      uri: 'ipfs://QmVvzR7KqmXRKpEe62ooafhnknxSuZJ5YzgwoLpfaZzi4y',
    });

    expect(ipfsResponse.ok).toBeTruthy();
    const ipfsContent = await ipfsResponse.text();

    const expectedContent = await fs.readFile(sampleFile, 'utf-8');

    expect(ipfsContent.trim()).toBe(expectedContent.trim());
  });

  // test skpped to preserve thirdweb IPFS storage usage
  test.skip('Test IPFS upload', async () => {
    const uri = await upload({
      client: credbullClient.thirdWebClient,
      files: [sampleFile],
    });

    console.log(uri);

    expect(uri.startsWith('ipfs://')).toBeTruthy();
  });
});
