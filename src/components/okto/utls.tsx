"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
// import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import axios from "axios";
import Image from "next/image";
// import { logoutGoogle } from "./utls-server";
import Cookies from "js-cookie";

// const  { authenticate } = useOkto() as OktoContextType;

export const logoutGoogle = async () => {
  try {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Remove next-auth session token cookie
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

const getWallet = async (auth_token: string) => {
  console.log(auth_token);
  const url = "https://sandbox-api.okto.tech/api/v1/wallet";
  const options = {
    method: "GET",
    headers: { Authorization: "Bearer YOUR_SECRET_TOKEN" },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
const Logout = async (auth_token: string) => {
  const url = "https://sandbox-api.okto.tech/api/v1/logout";
  const options = {
    method: "POST",
    headers: { Authorization: `Bearer ${auth_token} ` },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

type TransferResponse = {
  // Define the expected structure of the API response
  status: string;
  message?: string;
  data?: any; // Replace `any` with a more specific type if known
};

async function executeTokenTransfer(
  networkName: string,
  tokenAddress: string,
  quantity: string,
  recipientAddress: string,
  auth_token: string
): Promise<TransferResponse> {
  const url = "https://sandbox-api.okto.tech/api/v1/transfer/tokens/execute";
  console.log(auth_token);
  const body = JSON.stringify({
    network_name: networkName,
    token_address: tokenAddress,
    quantity: quantity,
    recipient_address: recipientAddress,
  });

  const options: RequestInit = {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_SECRET_TOKEN",
    },
    body: body,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TransferResponse = await response.json();
    console.log("Transfer successful:", data);
    return data; // Return data for further use
  } catch (error) {
    console.error("Error executing token transfer:", error);
    throw error; // Rethrow error for the caller to handle
  }
}

const createWalletOkto = async (auth_token: string) => {
  const url = "https://sandbox-api.okto.tech/api/v1/user_from_token";
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${auth_token} ` },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
type SignInButtonProps = {
  verified: string | null;
  setDis: React.Dispatch<React.SetStateAction<boolean>>; // setDis should return void, not boolean
};
const SignInButton: React.FC<SignInButtonProps> = ({ verified, setDis }) => {
  const { data: session } = useSession();
  // const provider = useAnchorProvider();
  // const { setVisible: setModalVisible } = useWalletModal();
  //   const { , onConnect, onDisconnect, publicKey, walletIcon, walletName } = useWalletMultiButton({
  //       onSelectWallet() {
  //           setModalVisible(true);
  //       },
  //   });
  // if(!session?.idToken && provider.wallet.publicKey){

  //       signIn("google"); //
  //     }
  // useEffect(() => {
  //   // console.log(provider.wallet.publicKey);
  //   if(provider.wallet.publicKey){
  //     if(!session?.idToken)
  //     signIn("google"); //
  //   }
  // }, []);

  const signInWithGoogle = async () => {
    // onConnect();
    await signIn("google"); // Redirect after sign-in
  };
  const authenticate = async (idToken: string) => {
    const options = {
      method: "POST",
      url: "https://sandbox-api.okto.tech/api/v1/authenticate",
      headers: {
        "X-Api-Key": "29a05be2-5fca-4132-8a4e-805fdcad83b0",
        // Authorization: "Vendor jwt token",
        "Content-Type": "application/json",
      },
      data: { id_token: idToken },
    };

    try {
      const { data } = await axios.request(options);
      createWalletOkto(data.auth_token);
      console.log(data);
      setDis(true);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const authenticate2 = async () => {
      if (session) {
        // Access the token from the session
        const idToken = session.idToken;
        if (idToken != null) {
          authenticate(idToken);
        }
        console.log(idToken);
        if (!idToken) {
          console.error("No ID token found in session");
          return;
        }
      }
    };

    authenticate2();
  }, [session]);

  return (
    <>
      {session?.idToken ? (
        <div className="right ">
          {verified == "logged-in" && (
            <div className="absolute bg-green-600 scale-75 border-2 border-[#1f1f1f]  rounded-full bottom-3 right-2">
              <CheckIcon />{" "}
            </div>
          )}

          <Image
            onClick={logoutGoogle}
            alt="profile"
            height={38}
            width={38}
            className="rounded-full"
            src={session.user?.image ? session.user?.image : ""}
          />
        </div>
      ) : (
        <>
          <div className="flex">
            <div className="flex px-2 rounded-md items-center justify-center  bg-white">
              <button
                onClick={signInWithGoogle}
                className="px-4d py-2 border flex gap-2 border-slate-200 rounded-lg dark:text-slate-200   transition duration-150"
              >
                <Image
                  width={10}
                  height={10}
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />

                <span className="text-black">Login with Google</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};

export { getWallet, Logout, executeTokenTransfer };
export default SignInButton;
