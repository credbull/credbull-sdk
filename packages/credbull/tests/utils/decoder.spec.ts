import { expect, test } from '@playwright/test';
import { AbiFunction } from 'abitype';
import { toBigInt } from 'ethers';
import { AbiParameterToPrimitiveType, type BaseTransactionOptions, encode, prepareContractCall } from 'thirdweb';
import { Hex } from 'thirdweb/src/utils/encoding/hex';
import { decodeFunctionData } from 'thirdweb/utils';

import { CredbullClient } from '../../src/credbull-client';
import { LiquidStone } from '../../src/liquid-stone/liquid-stone';
import { Address, testnetConfig, toAbiFunction } from '../../src/utils/utils';

const liquidStone: LiquidStone = new LiquidStone(new CredbullClient(testnetConfig));

test.describe('Test Decoder', () => {
  const to: Address = testnetConfig.liquidStone;
  const amount = toBigInt(12345); // amount with decimals
  const functionName = 'withdrawAsset';

  const withdrawTxn = withdrawAsset({
    contract: liquidStone.contract,
    amount: amount,
    to,
  });

  test('Test toAbiFunction', async () => {
    // @ts-expect-error // transaction types too complex to infer
    const abi: AbiFunction = await toAbiFunction(functionName, withdrawTxn);
    expect(abi.name).toContain(functionName);
    expect(abi.type).toEqual('function');
    expect(abi.inputs).toEqual([
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
    ]);
    expect(abi.outputs).toEqual([]);
  });

  test('Test Decode Function', async () => {
    // encode
    const encWithdrawTxn: Hex = await encode(withdrawTxn);

    // // decode the inputs.  expected result: [ '<toAddress', <scaledAmount> ]
    const decodedData = (await decodeFunctionData({
      contract: liquidStone.contract,
      data: encWithdrawTxn,
    })) as [string, bigint]; // typecast to expected output;

    expect(decodedData[0].toLowerCase()).toEqual(to.toLowerCase());
    expect(decodedData[1]).toEqual(amount);
  });
});

type WithdrawAssetParams = {
  to: AbiParameterToPrimitiveType<{ internalType: 'address'; name: 'to'; type: 'address' }>;
  amount: AbiParameterToPrimitiveType<{ internalType: 'uint256'; name: 'amount'; type: 'uint256' }>;
};

function withdrawAsset(options: BaseTransactionOptions<WithdrawAssetParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      '0x38e4f064',
      [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      [],
    ],
    params: [options.to, options.amount],
  });
}
