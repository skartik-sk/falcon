import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  const [latestProof] = useProver();
  const [newProof, SetNewProof] = useState(false);
  const router = useRouter();
  console.log(latestProof);
  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar);
    if (anonAadhaar.status == "logged-in") {
      if (newProof) {
        toast.success("Proof Generated successfully");
        router.push("/form");
        SetNewProof(false);
      }
    }
  }, [anonAadhaar]);

  return (
    <>
      <div
        onClick={() => {
          SetNewProof(true);
        }}
      >
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
