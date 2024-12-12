"use client";

import Link from "next/link";


import { ConnectButton, WalletButton } from "@rainbow-me/rainbowkit";
import SignInButton from "./okto/utls";

const Header: React.FC<HeaderProps> = ({ setAuthToken, authToken, handleLogout }) => {


  // useEffect(() => {
  //   let anon = localStorage.getItem("anonAadhaar");

  //   if (anon) {
  //     let anonData = JSON.parse(anon);

  //     if (anonData && anonData.status === "logged-in") {
  //       setVerified("logged-in");
  //     }
  //   }
  // }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50">
      <div className="flex p-4 my-2 justify-between items-center h-16">
        <div className="flex items-center">
          <Link href="/">
            <span className="logo-font text-4xl text-white">Anonyshare</span>
          </Link>
        </div>
        <div className="flex flex-col-reverse justify-center items-center sm:flex sm:flex-row gap-2 right-0">
          <WalletButton/>
         <SignInButton setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout}  />
        </div>
      </div>
    </nav>
  );
};

export default Header;
