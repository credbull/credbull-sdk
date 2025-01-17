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
      <div className="card-container">
        <h2 className="card-title">Connect Your Wallet</h2>
        <p>Connect your wallet to see your details.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Wallet Details</h2>
        <div className="form-control space-y-4">
          {/* Chain Info */}
          <div className="label-value-pair">
            <span className="label">Chain:</span>
            <span className="value">
              {activeChainMetadata?.data?.name || "Unknown"} (
              {activeChain?.id || "N/A"})
            </span>
          </div>

          {/* Address Info */}
          <div className="label-value-pair">
            <span className="label">Address:</span>
            <CopyableText text={account.address || "N/A"} />
          </div>

          {/* Balance Info */}
          <div className="label-value-pair">
            <span className="label">Balance:</span>
            <span className="value">
              {isLoading
                ? "Loading..."
                : `${balance?.displayValue} ${balance?.symbol || ""}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
