import { Abi, AbiFunction, AbiParameter } from 'abitype';

export type DecodedArgument = AbiParameter & {
  value: unknown;
};

export function decodeFunctionArgs(
  functionName: string,
  abi: Abi,
  decodedArgData: readonly unknown[],
): DecodedArgument[] {
  const abiItem = abi.find((item): item is AbiFunction => item.type === 'function' && item.name === functionName);

  if (!abiItem) {
    throw new Error('Function ABI not found or invalid.');
  }

  return abiItem.inputs.map((input: AbiParameter, index: number) => ({
    ...input,
    value: decodedArgData[index],
  }));
}
