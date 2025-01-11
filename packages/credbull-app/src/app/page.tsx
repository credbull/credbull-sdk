"use client";

import Image from "next/image";
import {
  ConnectButton,
  useActiveAccount,
  useWalletBalance,
} from "thirdweb/react";
import { client } from "./client";
import logo from "../../public/logo.3227e7d9.svg"; // Adjust path to match your file structure

import { arbitrumSepolia as chain } from "thirdweb/chains";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <Image src={logo} alt="CredBull Logo" width={120} height={120} />
          <h1 className="text-2xl font-semibold text-white mt-4">
            Connect Your Wallet
          </h1>
        </div>
        <div className="flex justify-center mb-6">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "Credbull",
              url: "https://credbull.io",
            }}
          />
        </div>
        <WalletInfo />
      </div>
    </main>
  );
}

function WalletInfo() {
  const account = useActiveAccount();
  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain, // Adjust to your preferred chain
    address: account?.address,
  });

  if (!account) {
    return (
      <p className="text-center text-gray-400">
        Please connect your wallet to view details.
      </p>
    );
  }

  return (
    <div className="bg-gray-700 p-4 rounded-lg text-white">
      <p className="mb-2">
        <span className="font-medium">Wallet Address:</span>
        <br />
        <span className="break-all text-sm text-gray-300">
          {account.address}
        </span>
      </p>
      <p>
        <span className="font-medium">Wallet Balance:</span>
        <br />
        {isLoading ? (
          <span className="text-gray-300">Loading...</span>
        ) : (
          <span className="text-gray-300">
            {balance?.displayValue} {balance?.symbol || ""}
          </span>
        )}
      </p>
    </div>
  );
}
