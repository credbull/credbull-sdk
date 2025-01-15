import Image from "next/image";
import { ConnectButton } from "thirdweb/react";
import logo from "../../public/logo.3227e7d9.svg";
import { client } from "@/app/client"; // Adjust the path as needed

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200 text-base-content flex flex-col">
      <NavBar />
      <PageContent>{children}</PageContent>
      <Footer />
    </div>
  );
}

// NavBar Component
function NavBar() {
  return (
    <header className="navbar bg-base-300 shadow-md">
      <div className="flex-1">
        <Image
          src={logo}
          alt="CredBull Logo"
          width={140}
          height={40}
          className="brightness-0 invert"
        />
      </div>
      <div className="flex-none">
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Credbull",
            url: "https://credbull.io",
          }}
        />
      </div>
    </header>
  );
}

// PageContent Component
function PageContent({ children }: { children: React.ReactNode }) {
  return <main className="flex-grow">{children}</main>;
}

// Footer Component
function Footer() {
  return (
    <footer className="footer p-4 bg-base-300 text-center text-base-content">
      © {new Date().getFullYear()} CredBull. All Rights Reserved.
    </footer>
  );
}
