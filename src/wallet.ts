// src/wallet.ts

import Web3 from "web3";

const getWeb3 = async (): Promise<Web3> => {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    throw new Error(
      "MetaMask is not installed. Please consider installing it to use this app."
    );
  }
};

export const connectWallet = async () => {
  try {
    const web3 = await getWeb3();
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return true;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      alert(
        "Please install MetaMask mobile app from the App Store (iOS) or Google Play Store (Android) to use this app on your mobile device."
      );
    } else {
      alert(
        "MetaMask is not installed. Please consider installing the MetaMask browser extension to use this app."
      );
    }
    return false;
  }
};

export const getAccount = async () => {
  const web3 = await getWeb3();
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};
