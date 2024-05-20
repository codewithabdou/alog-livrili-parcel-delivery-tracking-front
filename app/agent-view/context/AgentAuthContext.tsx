"use client";

import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/metamask";

type ContextType = {
  account: string | null;
  contract: ethers.Contract | null;
  signer: ethers.Signer | null;
  setAccount: (account: string) => void;
  setContract: (contract: ethers.Contract) => void;
  setSigner: (signer: ethers.Signer) => void;
};

export const context = createContext<ContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const AgentAuthContext: React.FC<Props> = ({ children }) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    connectWallet((address, signer, contract) => {
      setAccount(address);
      setContract(contract);
      setSigner(signer);
    });
  }, []);

  return (
    <context.Provider
      value={{
        account,
        contract,
        signer,
        setAccount,
        setContract,
        setSigner,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default AgentAuthContext;
