"use client";

import { useOkto, OktoContextType } from "okto-sdk-react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Error from "next/error";
import React from "react";

export const logoutGoogle = async (): Promise<void> => {
  try {
    if (typeof window !== "undefined") {
      // Remove the session token cookie
      document.cookie =
        "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
        window.location.hostname;
    }

    // Sign out using NextAuth
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
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

interface SignInButtonProps {
  setAuthToken: (token: string) => void;
  authToken: string | null;
  handleLogout: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({
  setAuthToken,
  authToken,
  handleLogout,
}) => {
  const router = useRouter();
  // const { authenticate } = useOkto() as OktoContextType;

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

  return (
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
  );
};

export default SignInButton;
