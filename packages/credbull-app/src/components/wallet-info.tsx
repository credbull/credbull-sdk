"use client";

import {
  useActiveAccount,
  useWalletBalance,
  useChainMetadata,
  useActiveWalletChain,
} from "thirdweb/react";
import { client } from "./client";
import CopyableText from "@/components/copyable-text";

export default function WalletInfo() {
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
      <div className="card bg-base-300 shadow-lg text-center">
        <div className="card-body">
          <h2 className="card-title text-2xl">Connect Your Wallet</h2>
          <p>Connect your wallet to see your details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-300 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-center text-2xl">Wallet Details</h2>
        <div className="space-y-4">
          {/* Chain Info */}
          <div>
            <span className="text-sm text-base-content/70">Chain:</span>
            <div className="text-lg">
              {activeChainMetadata?.data?.name || "Unknown"} (
              {activeChain?.id || "N/A"})
            </div>
          </div>

          {/* Address Info with CopyableText */}
          <CopyableText label="Address" text={account.address || "N/A"} />

          {/* Balance Info */}
          <div>
            <span className="text-sm text-base-content/70">Balance:</span>
            <div className="text-lg">
              {isLoading
                ? "Loading..."
                : `${balance?.displayValue} ${balance?.symbol || ""}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
