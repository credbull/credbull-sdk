import { AbiFunction, AbiParameter } from 'abitype';

// TODO: parse the function name rather than passing it in
export async function toAbiFunction(
  name: string,
  txn: {
    __preparedMethod?: () => Promise<[string, AbiParameter[], AbiParameter[]]>;
  },
): Promise<AbiFunction> {
  if (!txn.__preparedMethod) {
    throw new Error('Transaction does not contain a prepared method.');
  }

  const [selector, inputs, outputs] = await txn.__preparedMethod();

  return {
    type: 'function',
    name: `${name} + (${selector})`,
    stateMutability: 'nonpayable', // Replace with actual stateMutability if resolvable
    inputs,
    outputs,
  };
}
