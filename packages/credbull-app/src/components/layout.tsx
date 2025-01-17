import Image from "next/image";
import Link from "next/link"; // Import the Link component
import { ConnectButton } from "thirdweb/react";
import logo from "../../public/logo.3227e7d9.svg";
import { client } from "./client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// NavBar Component
function NavBar() {
  return (
    <div className="navbar bg-base-300 shadow-md">
      <div className="navbar-start">
        <Image
          src={logo}
          alt="CredBull Logo"
          width={140}
          height={40}
          className="brightness-0 invert"
        />
        {/* Navigation Links */}
        <ul className="menu menu-horizontal px-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/liquid-stone">LiquidStone</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ConnectButton
          client={client}
          theme="light"
          appMetadata={{
            name: "Credbull",
            url: "https://credbull.io",
          }}
        />
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <div className="footer items-center justify-center p-4 bg-base-300 text-center">
      <p>© {new Date().getFullYear()} Credbull. All Rights Reserved.</p>
    </div>
  );
}
