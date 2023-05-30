// src/components/Header.tsx

import React from "react";
import "./Header.css";
import { connectWallet } from "../wallet";

interface HeaderProps {
  connected: boolean;
  account?: string;
  onWalletConnect: () => Promise<void>;
}

const Header: React.FC<HeaderProps> = ({
  connected,
  account,
  onWalletConnect,
}) => {
  const displayAccount = () => {
    if (account) {
      const firstPart = account.slice(0, 6);
      const lastPart = account.slice(-4);
      return `${firstPart}...${lastPart}`;
    }
    return "";
  };

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="logo">
          <img src="/logo.svg" alt="Stelofund" />
        </a>
        <nav className="navigation">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/submit">Submit a Project</a>
            </li>
          </ul>
        </nav>
        <button
          className="connect-wallet"
          onClick={onWalletConnect}
          disabled={connected}
        >
          {connected ? displayAccount() : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
};

export default Header;
