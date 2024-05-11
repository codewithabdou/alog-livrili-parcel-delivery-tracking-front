"use client";

import React, { Suspense } from "react";
import AgentAuthContext from "./context/AgentAuthContext";
import AgentView from "./AgentView";

const Agent = () => {
  return (
    <Suspense>
      <AgentAuthContext>
        <AgentView />
      </AgentAuthContext>
    </Suspense>
  );
};

export default Agent;
