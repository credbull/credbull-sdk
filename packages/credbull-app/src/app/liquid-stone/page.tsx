"use client";

import Layout from "@/components/layout";
import HexDecoder from "@/components/decoder";

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center justify-center p-4"></div>
      <HexDecoder />
    </Layout>
  );
}
