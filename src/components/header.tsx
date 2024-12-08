"use client";
import Link from "next/link";
import SignInButton from "@/components/okto/utls";
import Anon from "./Anon";
import { useEffect, useState } from "react";

const data = {
  status: "logged-in",
  anonAadhaarProofs: {
    "0": {
      type: "anon-aadhaar",
      pcd: '{"type":"anon-aadhaar","id":"46668e3c-b9e9-43c5-95d1-fa6e679b0e58","claim":{"pubKey":["1640818228760052179859042244355947249","2556500785716576226415796061849734159","1773663274924506786300654122545997574","156007087115998107687088234502964965","1007983086444915868913459627234715796","1207907671574654908578158113785868692","661583974440108157749604450701607929","2294674184689511060148392370957342314","2125217202257742866740569471305663059","757604698857004563734075326539558731","200007885942223577865900248803094107","634836160982611096393054589936335825","1449711680328986902465274550271974011","203106953707476066515237197004426128","531393944197892908304277361531706813","2243235350875430237629201981240106035","3040469700157016219231660416032053"],"signalHash":"10010552857485068401460384516712912466659718519570795790728634837432493097374","ageAbove18":true,"gender":"M","pincode":"110051","state":"Delhi"},"proof":{"groth16Proof":{"pi_a":["19379196194674176890613912951264707909441541005024931520570884257175253527820","9456584116169386582122113578801767552144523981627389917224610229731481493896","1"],"pi_b":[["4817924559078567608951651876503151877147459835583085105626054566275295330472","21310320845130817697433658986449994093141268655498180349143165986227655862122"],["4070932170649769886870243986567202161529094400026793601799163701263859841401","3188671357389881681820545902665462895545824652317043920573187818434287764133"],["1","0"]],"pi_c":["21265290055787349716552797790226658095292814309645571516142256169996589485752","8784760813466792311607341334115114245351969591443530964204511294125494978674","1"],"protocol":"groth16","curve":"bn128"},"pubkeyHash":"15134874015316324267425466444584014077184337590635665158241104437045239495873","timestamp":"1733578200","nullifierSeed":"1234","nullifier":"7021035827048903006210484089676800173873483642971825205754098953906761302901","signalHash":"10010552857485068401460384516712912466659718519570795790728634837432493097374","ageAbove18":"1","gender":"77","pincode":"110051","state":"452723500356"}}',
    },
  },
};

// Define types for the props
interface HeaderProps {
  setAuthToken: (token: string) => void;
  authToken: string | null;
  handleLogout: () => void;
}

// Define the structure of the data stored in localStorage
interface AnonAadhaarData {
  status: string;
}

const Header: React.FC<HeaderProps> = ({
  setAuthToken,
  authToken,
  handleLogout,
}) => {
  const [verified, setVerified] = useState<string | null>(null);

  useEffect(() => {
    const anon = localStorage.getItem("anonAadhaar");

    if (anon) {
      try {
        const anonData: AnonAadhaarData = JSON.parse(anon);

        if (anonData.status === "logged-in") {
          setVerified("logged-in");
        }
      } catch (error) {
        console.error(
          "Failed to parse anonAadhaar data from localStorage:",
          error
        );
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1f1f1f00] backdrop-blur-xl z-50">
      <div className="flex p-4 my-2 md:gap-32 lg:gap-64 justify-between items-center h-16">
        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center  ">
            <Link href="/">
              <span className="logo-font text-[42px] text-white">
                Anonyshare
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-center items-center sm:flex sm:flex-row gap-2 right-0">
          <SignInButton
            setAuthToken={setAuthToken}
            authToken={authToken}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
