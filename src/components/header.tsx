"use client";

import Link from "next/link";
import SignInButton from "@/components/okto/utls";
import Anon from "./Anon";
import { useEffect, useState } from "react";

const Header = () => {
  const [verified, setVerified] = useState<string | null>(null);
  const [dis, setDis] = useState(false);

  useEffect(() => {
    let anon = localStorage.getItem("anonAadhaar");

    if (anon) {
      let anonData = JSON.parse(anon);

      if (anonData && anonData.status === "logged-in") {
        setVerified("logged-in");
      }
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#1f1f1f00] backdrop-blur-xl z-50">
      <div className="flex p-4 my-2 md:gap-32 lg:gap-64 justify-between items-center h-16">
        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center  ">
            <Link href="/">
              <span className="logo-font text-[42px] text-white">Falcon</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-center items-center sm:flex sm:flex-row gap-2 right-0">
          {!verified && <Anon verified={verified} Dis={dis} />}
          <SignInButton setDis={setDis} verified={verified} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
