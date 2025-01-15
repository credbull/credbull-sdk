"use client";

import { useState } from "react";
import {
  useActiveAccount,
  useWalletBalance,
  useChainMetadata,
  useActiveWalletChain,
} from "thirdweb/react";

export default function WalletInfo() {
  const [notifications, setNotifications] = useState<string[]>([]);
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const activeChainMetadata = useChainMetadata(activeChain);

  const { data: balance, isLoading } = useWalletBalance({
    client: {
      /* Your client setup */
    },
    chain: activeChain,
    address: account?.address,
  });

  const showNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => setNotifications((prev) => prev.slice(1)), 3000);
  };

  if (!account) {
    return (
      <div className="card bg-base-300 p-6 shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
        <p>Connect your wallet to see your details.</p>
      </div>
    );
  }

  return (
    <div className="card bg-base-300 p-8 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Wallet Details
      </h2>
      <div className="space-y-4">
        <DetailBlock
          label="Chain"
          value={`${activeChainMetadata?.data?.name || "Unknown"} (${
            activeChain?.id || "N/A"
          })`}
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

      {/* Notifications */}
      {notifications.map((notification, index) => (
        <div key={index} className="toast toast-end">
          <div className="alert alert-success shadow-lg">{notification}</div>
        </div>
      ))}
    </div>
  );
}

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
    <div>
      <span className="text-sm text-base-content/70">{label}:</span>
      <div
        className={`text-lg ${
          isAddress ? "cursor-pointer hover:underline" : ""
        }`}
        onClick={isAddress ? handleCopy : undefined}
      >
        {value || "N/A"}
      </div>
    </div>
  );
}
