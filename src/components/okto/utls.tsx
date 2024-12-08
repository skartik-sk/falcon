"use client";

import { useOkto, OktoContextType } from "okto-sdk-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app/lib/constant";
import { useWriteContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signOut } from "next-auth/react";
import Error from "next/error";
import React from "react";

const SignInButton = ({ setAuthToken, authToken, handleLogout }) => {
  const router = useRouter();
  const test = useOkto();
  const authenticate = test?.authenticate;
  const { data: hash, writeContract } = useWriteContract();

  async function registerUsers() {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "registerUser",
      args: ["", "", "", ""],
    });
    console.log(hash);
  }

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    if (idToken && authenticate) {
      authenticate(
        idToken,
        async (
          authResponse: { auth_token: string } | null,
          error: Error | null
        ) => {
          if (authResponse) {
            console.log("Authentication successful:", authResponse);
            setAuthToken(authResponse.auth_token);
            router.push("/");
          } else if (error) {
            console.error("Authentication error:", error);
          }
        }
      );
    } else {
      console.error("Authentication failed or not defined");
    }
  };

  const onLogoutClick = (): void => {
    handleLogout();
    router.push("/");
  };

  const getWallet = async (authToken: string): Promise<void> => {
    const url = "https://sandbox-api.okto.tech/api/v1/wallet";
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Wallet data:", data);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  const Logout = async (authToken: string): Promise<void> => {
    const url = "https://sandbox-api.okto.tech/api/v1/logout";
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${authToken}` },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Logout successful:", data);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const logoutGoogle = async (): Promise<void> => {
    try {
      if (typeof window !== "undefined") {
        document.cookie =
          "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
          window.location.hostname;
      }

      await signOut({
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <ConnectButton />
      <div>
        {!authToken ? (
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={(error: Error) =>
              console.error("Google login failed:", error)
            }
            useOneTap
            promptMomentNotification={(notification: {
              isDisplayMoment: boolean;
            }) => console.log("Prompt moment notification:", notification)}
          />
        ) : (
          <button onClick={onLogoutClick}>Authenticated, Logout</button>
        )}
      </div>
    </div>
  );
};

export default SignInButton;
