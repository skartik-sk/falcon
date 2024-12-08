
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useEffect } from "react";

export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const [ latestProof] = useProver();
console.log(latestProof);
  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>
    
        <div>
          <LogInWithAnonAadhaar
            fieldsToReveal={[
              "revealAgeAbove18",
              "revealPinCode",
              "revealState",
              "revealGender",
            ]}
            nullifierSeed={1234}
          />

          {/* <p>{anonAadhaar?.status}</p> */}
        </div>

    </>

  );
}
