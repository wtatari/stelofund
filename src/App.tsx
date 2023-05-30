// src/App.tsx

import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { connectWallet, getAccount } from "./wallet";

function App() {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | undefined>(undefined);

  useEffect(() => {
    const checkWalletConnection = async () => {
      const connectedAccount = await getAccount();
      if (connectedAccount) {
        setConnected(true);
        setAccount(connectedAccount);
      }
    };

    checkWalletConnection();
  }, []);

  const handleWalletConnect = async () => {
    const isConnected = await connectWallet();
    if (isConnected) {
      console.log("Wallet connected");
      setConnected(true);
      const connectedAccount = await getAccount();
      setAccount(connectedAccount);
    } else {
      console.log("Failed to connect wallet");
    }
  };

  const handleWalletDisconnect = () => {
    setConnected(false);
    setAccount(undefined);
    alert(
      "To fully disconnect your wallet, please do so manually via the MetaMask extension. Open MetaMask, click on the profile icon, then click on 'Connected sites' and 'Disconnect' next to this dApp's domain."
    );
  };

  return (
    <div className="App">
      <Header
        connected={connected}
        account={account}
        onWalletConnect={handleWalletConnect}
      />
      <main>{/* Your main content goes here */}</main>
    </div>
  );
}

export default App;
