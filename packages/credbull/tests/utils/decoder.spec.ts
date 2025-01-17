import { expect, test } from '@playwright/test';
import { Abi } from 'abitype';
import { encode } from 'thirdweb';
import { Hex } from 'thirdweb/src/utils/encoding/hex';
import { decodeFunctionData } from 'thirdweb/utils';
import { decodeFunctionData as decodeFunctionDataViem, encodeFunctionData as encodeFunctionDataViem } from 'viem';

import { DecodedArgument, LiquidStone, liquidStoneAbi } from '../../src';
import { CredbullClient } from '../../src/credbull-client';
import { Address, ChainConfig, decodeFunctionArgs, testnetConfig } from '../../src/utils/utils';

const chainConfig: ChainConfig = testnetConfig;
const liquidStone: LiquidStone = new LiquidStone(new CredbullClient(chainConfig));

test.describe('Test encode and decode', () => {
  const functionName = 'withdrawAsset';
  const toAddress: Address = chainConfig.liquidStone;
  const amount: bigint = BigInt(12345); // amount with decimals
  const abi: Abi = liquidStoneAbi;

  // see: https://viem.sh/docs/contract/decodeFunctionData.html
  test('Test abi encode and decode', async () => {
    const encodedFunction: Hex = encodeFunctionDataViem({
      abi,
      functionName,
      args: [toAddress, amount],
    });

    const { functionName: decFunctionName, args: decArgs } = decodeFunctionDataViem({
      abi: liquidStoneAbi,
      data: encodedFunction,
    });

    expect(decFunctionName).toEqual(functionName);
    expect(decArgs).toEqual([toAddress, amount]);

    const namedArgs: DecodedArgument[] = decodeFunctionArgs(functionName, abi, decArgs);

    expect(namedArgs).toMatchObject([
      { name: 'to', value: toAddress },
      { name: 'amount', value: BigInt(amount) },
    ]);
  });

  // see: https://portal.thirdweb.com/references/typescript/v5/decodeFunctionData
  test('Test thirdweb encode and decode', async () => {
    const preparedTxn = await liquidStone.withdrawAssetTxn(toAddress, amount);
    const encodedFunction: Hex = await encode(preparedTxn);

    const [decodedAddress, decodedAmount] = (await decodeFunctionData({
      contract: liquidStone.contract,
      data: encodedFunction,
    })) as [Address, bigint]; // cast to correct types

    expect(decodedAddress.toLowerCase()).toEqual(toAddress.toLowerCase());
    expect(decodedAmount).toEqual(amount);
  });
});
