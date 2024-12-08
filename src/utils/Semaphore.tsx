"use client";
import React from "react";

import { Identity } from "@semaphore-protocol/core";

const generateIdentity = () => {
  // Create a new Semaphore identity
  const identity = new Identity();

  // Save the identity to local storage
  localStorage.setItem("identity", identity.export());

  // Return the generated identity details
  return {
    privateKey: identity.export(),
    publicKey: [
      identity.publicKey[0].toString(),
      identity.publicKey[1].toString(),
    ],
    commitment: identity.commitment.toString(),
  };
};

const handleIdentityGeneration = () => {
  const newIdentity = generateIdentity();
  localStorage.setItem("identity", JSON.stringify(newIdentity));
  console.log("New Identity Generated:", newIdentity);
  // Additional logic like updating state, showing confirmation, etc.
};

function page() {
  return (
    <div>
      <button onClick={handleIdentityGeneration}>Generate Identity</button>
    </div>
  );
}

export default page;
