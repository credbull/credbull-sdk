"use client";

import Image from "next/image";
import {
  ConnectButton,
  useActiveAccount,
  useWalletBalance,
  useChainMetadata,
  useActiveWalletChain,
} from "thirdweb/react";
import { useState } from "react";
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
  const [notifications, setNotifications] = useState<string[]>([]);

  // Fetching wallet data dynamically
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const activeChainMetadata = useChainMetadata(activeChain);

  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: activeChain,
    address: account?.address,
  });

  // Show notification function
  const showNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]); // Add new notification
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1)); // Remove after 3 seconds
    }, 3000);
  };

  // Handle case when no wallet is connected
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

  // Render wallet details dynamically
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-white max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Wallet Details
      </h2>
      <div className="space-y-6">
        <DetailBlock
          label="Chain"
          value={`${activeChainMetadata?.data?.name || "Unknown"} (${activeChain?.id || "N/A"})`}
        />
        <DetailBlock
          label="Address"
          value={account.address}
          isAddress
          showNotification={showNotification}
        />
        <DetailBlock
          label="Balance"
          value={
            isLoading
              ? "Loading..."
              : `${balance?.displayValue} ${balance?.symbol || ""}`
          }
        />
      </div>

      {/* Notifications Container */}
      <div className="fixed bottom-4 left-4 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-gray-700 text-white py-2 px-4 rounded shadow-md animate-popup"
          >
            {notification}
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable Detail Block for rendering wallet fields
function DetailBlock({
  label,
  value,
  isAddress,
  showNotification,
}: {
  label: string;
  value: string | undefined;
  isAddress?: boolean;
  showNotification?: (message: string) => void;
}) {
  const handleCopy = () => {
    if (value && showNotification) {
      navigator.clipboard.writeText(value);
      showNotification("Address copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <span className="text-gray-400 text-sm">{label}:</span>
      <div
        className={`text-lg font-medium ${
          isAddress
            ? "text-gray-300 cursor-pointer hover:underline"
            : "text-white"
        } break-words`}
        onClick={isAddress ? handleCopy : undefined} // Make address clickable
        style={{ wordWrap: "break-word" }}
      >
        {value || "N/A"}
      </div>
    </div>
  );
}
