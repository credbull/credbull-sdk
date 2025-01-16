import { ethers } from 'ethers';

// Define the ABI method type as a reusable type
type MethodAbi = [
  string, // Function signature (e.g., '0x38e4f064')
  ReadonlyArray<{ internalType: string; name: string; type: string }>, // Inputs
  ReadonlyArray<{ internalType: string; name: string; type: string }>, // Outputs
];

/**
 * Decodes transaction data into human-readable parameters.
 * @param encodedData - The hex-encoded transaction data.
 * @param method - The ABI method definition.
 */
export function decode(encodedData: string, method: MethodAbi): void {
  console.log(`Decoding Method:`, method);

  const [signature, inputs] = method;

  // Ensure signature and inputs are valid
  if (!signature || !Array.isArray(inputs)) {
    throw new Error('Invalid method format: Expected [signature, inputs, outputs]');
  }

  // Remove the method selector (first 4 bytes of the data)
  const encodedParams = encodedData.slice(10); // Skip "0x" and method selector

  // Decode the parameters
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  const decodedParams = abiCoder.decode(
    inputs.map((input) => input.type),
    `0x${encodedParams}`,
  );

  console.log(`Decoded Transaction for Method: ${signature}`);
  console.log('Parameters:');
  inputs.forEach((input, index) => {
    console.log(`  ${input.name} (${input.type}): ${decodedParams[index].toString()}`);
  });
}
