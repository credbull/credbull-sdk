import { CredbullClient } from '../credbull-client';
import { CredbullContract } from '../credbull-contract';
import { Address } from '../utils/utils';

import { yearnRoleManagerAbi } from './extensions/v3.0.4/yearn-role-manager-factory-abi';

export class YearnRoleManagerFactory extends CredbullContract {
  public static readonly ADDRESS_V3_0_3: Address = '0xca12459a931643BF28388c67639b3F352fe9e5Ce';

  constructor(credbullClient: CredbullClient) {
    super(credbullClient, YearnRoleManagerFactory.ADDRESS_V3_0_3, yearnRoleManagerAbi);
  }
}

export * from './extensions/v3.0.4/yearn-role-manager-factory';
