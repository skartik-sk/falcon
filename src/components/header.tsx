"use client";

import Link from "next/link";
// Uncomment this line if SignInButton is available
// import SignInButton from "@/components/okto/utils";
import { useEffect, useState } from "react";
import Annon from "./Anon";

interface HeaderProps {
  setAuthToken: (token: string) => void;
  authToken: string | null;
  handleLogout: () => void;
}

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
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-xl z-50">
      <div className="flex p-4 my-2 justify-between items-center h-16">
        <div className="flex items-center">
          <Link href="/">
            <span className="logo-font text-4xl text-white">Anonyshare</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* Uncomment this block if SignInButton is available */}

          {/* <SignInButton
            setAuthToken={setAuthToken}
            authToken={authToken}
            handleLogout={handleLogout}
          /> */}

          {authToken ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setAuthToken("mock-token")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}

          <Annon verified={"logged-out"} Dis={true} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
