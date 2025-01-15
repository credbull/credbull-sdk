"use client";

import Layout from "@/components/layout";
import WalletInfo from "@/components/wallet-info";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center p-4">
        <WalletInfo />
      </div>
    </Layout>
  );
}
