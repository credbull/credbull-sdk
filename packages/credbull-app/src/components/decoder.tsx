"use client";

import { useState } from "react";
import { liquidStoneAbi } from "@credbull-sdk/credbull";
import { decodeFunctionData } from "viem";

type DecodedFunctionData = {
  functionName: string;
  args: (string | bigint | number | boolean)[];
};

export default function HexDecoder() {
  const [hexInput, setHexInput] = useState<string>(""); // State to store the input
  const [decodedValue, setDecodedValue] = useState<DecodedFunctionData | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null); // State to store errors

  const handleDecode = () => {
    setError(null);
    setDecodedValue(null);

    try {
      const { functionName, args } = decodeFunctionData({
        abi: liquidStoneAbi,
        data: hexInput,
      });

      setDecodedValue({ functionName, args });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Decoding Error: ${err.message}`);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card bg-base-100 shadow-lg w-full max-w-2xl p-8 rounded-xl">
        <h2 className="card-title text-center mb-6 text-3xl font-bold text-primary">
          Hex Decoder
        </h2>
        <div className="form-control space-y-6">
          {/* Input Box */}
          <input
            type="text"
            className="input input-bordered w-full text-base"
            placeholder="Enter Hexadecimal"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
          />

          {/* Decode Button */}
          <button
            className="btn btn-primary btn-lg"
            onClick={handleDecode}
            disabled={!hexInput.trim()} // Disable if input is empty
          >
            Decode
          </button>

          {/* Decoded Result */}
          {decodedValue && (
            <div className="mt-6 bg-base-200 p-6 rounded-lg shadow-inner overflow-x-auto">
              <h3 className="text-xl font-bold text-secondary mb-4">
                Decoded Function
              </h3>
              <div className="mb-4">
                <span className="block text-lg font-semibold text-gray-600">
                  Function Name:
                </span>
                <div className="text-lg bg-base-300 p-3 rounded-md">
                  {decodedValue.functionName}
                </div>
              </div>
              <div>
                <span className="block text-lg font-semibold text-gray-600">
                  Arguments:
                </span>
                <div className="grid grid-cols-1 gap-3 mt-3">
                  {decodedValue.args.map((arg, index) => (
                    <div
                      key={index}
                      className="p-3 bg-base-300 rounded-md flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-500">
                        Arg {index + 1}
                      </span>
                      <span className="font-mono">{arg.toString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-200 text-red-900 p-4 rounded-lg">
              <h3 className="text-lg font-bold">Error:</h3>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
