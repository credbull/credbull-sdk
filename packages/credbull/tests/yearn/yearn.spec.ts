import { expect, test } from '@playwright/test';

import { CredbullClient } from '../../src/credbull-client';
import { testnetConfig } from '../../src/utils/utils';
import { YearnRoleManagerFactory, apiVersion } from '../../src/yearn/yearn';

const credbullClient = new CredbullClient(testnetConfig);
const yearnRoleManagerFactory = new YearnRoleManagerFactory(credbullClient);

test.describe('Test Yearn Factory View functions', () => {
  test('Test read version', async () => {
    const version = await apiVersion({
      contract: yearnRoleManagerFactory.contract,
    });

    expect(version).toBe('3.0.3');
  });
});
