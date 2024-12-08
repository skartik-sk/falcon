import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app/lib/constant";
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect } from "react";


type Verified = {
  verified: string | null;
  Dis: boolean;
};
export default function Annon({ verified, Dis }: Verified) {
  const [anonAadhaar] = useAnonAadhaar();
  const [ latestProof] = useProver();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);
  return (
    <>
      
        <div className="m-64">
          <LogInWithAnonAadhaar nullifierSeed={1234} />
          {/* <p>{anonAadhaar?.status}</p> */}
        </div>
      
    </>
  );
}
