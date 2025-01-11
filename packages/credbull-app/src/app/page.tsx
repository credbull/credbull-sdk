"use client";

import Image from "next/image";
import {
  ConnectButton,
  useActiveAccount,
  useWalletBalance,
  useChainMetadata,
  useActiveWalletChain,
} from "thirdweb/react";
import { client } from "./client";
import logo from "../../public/logo.3227e7d9.svg"; // Adjust path to match your file structure

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation Bar */}
      <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="CredBull Logo"
            width={140}
            height={40}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Credbull",
            url: "https://credbull.io",
          }}
        />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4">
        <WalletInfo />
      </main>

      {/* Footer */}
      <footer className="py-4 bg-gray-800 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CredBull. All Rights Reserved.
      </footer>
    </div>
  );
}

function WalletInfo() {
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const activeChainMetadata = useChainMetadata(activeChain);

  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: activeChain,
    address: account?.address,
  });

  if (!account) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center text-gray-300 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Connect Your Wallet
        </h2>
        <p>Connect your wallet to see your details.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Wallet Details
      </h2>
      <div className="text-gray-300 text-sm">
        <p className="mb-2">
          <span className="font-medium text-white">Chain:</span>
          <br />
          {activeChainMetadata?.data?.name} ({activeChain?.id})
        </p>
        <p className="mb-2">
          <span className="font-medium text-white">Address:</span>
          <br />
          <span className="break-all">{account.address}</span>
        </p>
        <p>
          <span className="font-medium text-white">Balance:</span>
          <br />
          {isLoading
            ? "Loading..."
            : `${balance?.displayValue} ${balance?.symbol || ""}`}
        </p>
      </div>
    </div>
  );
}
