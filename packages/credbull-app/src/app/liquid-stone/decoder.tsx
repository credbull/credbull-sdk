"use client";

import { useState } from "react";
import {
  liquidStoneAbi,
  decodeFunctionArgs,
  DecodedArgument,
} from "@credbull-sdk/credbull";
import { decodeFunctionData, Hex } from "viem";
import ErrorMessage from "@/components/error";

export default function HexFunctionDecoder() {
  const [hexInput, setHexInput] = useState<string>("");
  const [decodedFunction, setDecodedFunction] = useState<{
    functionName: string;
    args: DecodedArgument[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecode = () => {
    setError(null);
    setDecodedFunction(null);

    try {
      const { functionName, args } = decodeFunctionData({
        abi: liquidStoneAbi,
        data: hexInput as Hex,
      });

      const decodedArgs = decodeFunctionArgs(
        functionName,
        liquidStoneAbi,
        args || [],
      );

      setDecodedFunction({ functionName, args: decodedArgs });
    } catch (err: unknown) {
      console.error("Decoding Error:", err); // Log error to the console
      if (err instanceof Error) {
        setError(`Decoding Error: ${err.message}`);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && hexInput.trim()) {
      handleDecode();
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Decode Function</h2>
        <div className="form-control">
          {/* Input Box */}
          <input
            type="text"
            className="input input-bordered w-full text-base"
            placeholder="Enter Hexadecimal"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value as Hex)}
            onKeyDown={handleKeyDown}
          />

          {/* Decode Button */}
          <button
            className="btn btn-lg"
            onClick={handleDecode}
            disabled={!hexInput.trim()}
          >
            Decode
          </button>

          {/* Decoded Result */}
          {decodedFunction && (
            <div className="card-section">
              <h3 className="card-section-title">Decoded Function</h3>

              {/* Function Name */}
              <div className="label-value-pair">
                <span className="label">Function Name:</span>
                <span className="value">{decodedFunction.functionName}</span>
              </div>

              {/* Arguments */}
              <div>
                <span className="label">Arguments:</span>
                <div className="grid grid-cols-1 gap-3 mt-3">
                  {decodedFunction.args.map((arg, index) => (
                    <div key={index} className="label-value-pair">
                      <span className="label">{arg.name}:</span>
                      <span className="value">{arg.value?.toString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && <ErrorMessage message={error} />}
        </div>
      </div>
    </div>
  );
}
