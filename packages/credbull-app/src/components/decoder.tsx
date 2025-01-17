"use client";

import { useState } from "react";
import { liquidStoneAbi } from "@credbull-sdk/credbull";
import { decodeFunctionData } from "viem";

export default function HexDecoder() {
  const [hexInput, setHexInput] = useState<string>(""); // State to store the input
  const [decodedValue, setDecodedValue] = useState<string | null>(null); // State to store the decoded result
  const [error, setError] = useState<string | null>(null); // State to store errors

  const handleDecode = () => {
    setError(null); // Clear previous errors
    setDecodedValue(null); // Clear previous results

    console.log(hexInput);

    try {
      // Use the viem decodeFunctionData utility with the liquidStoneAbi
      const { functionName, args } = decodeFunctionData({
        abi: liquidStoneAbi,
        data: hexInput,
      });

      // Convert BigInt values to strings
      const sanitizedArgs = args.map((arg) =>
        typeof arg === "bigint" ? arg.toString() : arg,
      );

      // Set the decoded result
      setDecodedValue(
        `Function Name: ${functionName}, Arguments: ${JSON.stringify(sanitizedArgs)}`,
      );
    } catch (err: unknown) {
      setError("Invalid hex input or decoding error.");
      throw err;
    }
  };

  return (
    <div className="card bg-base-300 shadow-lg p-6 max-w-md mx-auto">
      <h2 className="card-title text-center mb-4">Hex Decoder</h2>
      <div className="form-control space-y-4">
        {/* Input Box */}
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Enter Hexadecimal"
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
        />

        {/* Decode Button */}
        <button
          className="btn btn-primary"
          onClick={handleDecode}
          disabled={!hexInput.trim()} // Disable if input is empty
        >
          Decode
        </button>

        {/* Decoded Result */}
        {decodedValue && (
          <div className="mt-4 bg-base-200 p-4 rounded overflow-x-auto break-words max-w-full">
            <h3 className="text-lg font-bold">Decoded Value:</h3>
            <p className="text-sm">{decodedValue}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-300 text-red-800 p-4 rounded">
            <h3 className="text-lg font-bold">Error:</h3>
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
