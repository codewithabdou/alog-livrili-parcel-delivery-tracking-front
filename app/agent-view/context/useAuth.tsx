import { useContext } from "react";
import { context } from "./AgentAuthContext";

const useAuth = () => {
  const values = useContext(context);
  if (!values) {
    throw new Error("useHook must be used within a ContextProvider");
  }
  return values;
};

export default useAuth;
