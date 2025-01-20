"use client";

import { useActiveWalletChain } from "thirdweb/react";

const POLYGON_CHAIN_ID = 137; // Polygon Mainnet Chain ID

export default function RequirePolygonChain({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeChain = useActiveWalletChain();

  if (!activeChain || activeChain.id !== POLYGON_CHAIN_ID) {
    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Please connect to Polygon.</h2>
          <p className="card-text">
            Fund Operations must be run on the Polygon chain.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
