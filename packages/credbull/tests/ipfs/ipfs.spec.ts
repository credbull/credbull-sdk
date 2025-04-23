import { expect, test } from '@playwright/test';
import fetch from 'node-fetch';
import path from 'path';

import fs from 'fs/promises';

// make sure node-fetch is available in your test env

test.describe('Test IPFS', () => {
  test('Test IPFS download', async () => {
    const ipfsUrl = 'https://ipfs.io/ipfs/QmVvzR7KqmXRKpEe62ooafhnknxSuZJ5YzgwoLpfaZzi4y';

    const ipfsResponse = await fetch(ipfsUrl);
    expect(ipfsResponse.ok).toBeTruthy();
    const ipfsContent = await ipfsResponse.text();

    const filePath = path.resolve(__dirname, './sample_1.csv');
    const expectedContent = await fs.readFile(filePath, 'utf-8');

    // console.log('Fetched from IPFS:\n', ipfsContent.split('\n').slice(0, 5).join('\n'));
    // console.log('Expected content:\n', expectedContent.split('\n').slice(0, 5).join('\n'));

    // Compare
    expect(ipfsContent.trim()).toBe(expectedContent.trim());
  });
});
