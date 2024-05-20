import { ethers } from "ethers";

import { MetaMaskInpageProvider } from "@metamask/providers";
import ParcelContract from "./parcel-contract";

declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider;
  }
}

export const connectWallet = async (
  handle: (
    address: string,
    signer: ethers.Signer,
    contract: ethers.Contract
  ) => void
) => {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      handle(accounts[0], provider.getSigner(), ParcelContract(provider));
    } catch (err) {
      if (err instanceof Error) {
        console.log("An error occured while connecting to metamask");
      }
      console.log("An error occured while connecting to metamask");
    }
  } else {
    console.log("Please install metamask");
  }
};

export const getCurrentWalletConnected = async (
  handle: (
    address: string,
    signer: ethers.Signer,
    contract: ethers.Contract
  ) => void
) => {
  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length > 0) {
        handle(accounts[0], provider.getSigner(), ParcelContract(provider));
      } else {
        console.log("Please connect to metamask");
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log("An error occured while connecting to metamask");
      }
      console.log("An error occured while connecting to metamask");
    }
  } else {
    console.log("Please install metamask");
  }
};
