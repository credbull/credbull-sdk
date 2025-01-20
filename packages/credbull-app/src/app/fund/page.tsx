"use client";

import SetFundNavUpdater from "@/app/fund/_components/fund-nav-updater";
import RequirePolygonChain from "@/app/fund/_components/fund-chain";

export default function Home() {
  return (
    <RequirePolygonChain>
      <SetFundNavUpdater />
    </RequirePolygonChain>
  );
}
