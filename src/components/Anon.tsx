import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect } from "react";

type Verified = {
  verified: string | null;
  setVerified: (value: string | null) => void;
};

export default function Home({ verified, setVerified }: Verified) {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>
      {!verified && (
        <div>
          <LogInWithAnonAadhaar nullifierSeed={1234} />

          {/* <p>{anonAadhaar?.status}</p> */}
        </div>
      )}
    </>
  );
}
