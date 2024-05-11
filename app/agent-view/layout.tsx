import React from "react";
import AgentAuthContext from "./context/AgentAuthContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AgentAuthContext>{children}</AgentAuthContext>;
};

export default layout;
