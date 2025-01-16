import { AbiFunction, AbiParameter } from 'abitype';

export async function toAbiFunction(
  name: string,
  txn: {
    __preparedMethod?: () => Promise<[string, AbiParameter[], AbiParameter[]]>;
  },
): Promise<AbiFunction> {
  if (!txn.__preparedMethod) {
    throw new Error('Transaction does not contain a prepared method.');
  }

  const [, inputs, outputs] = await txn.__preparedMethod();

  return {
    type: 'function',
    name,
    stateMutability: 'nonpayable', // Replace with actual stateMutability if resolvable
    inputs,
    outputs,
  };
}
