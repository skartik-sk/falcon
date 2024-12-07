"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
// import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import axios from "axios";
import Image from "next/image";

// const  { authenticate } = useOkto() as OktoContextType;

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
  auth_token:string
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

const SignInButton = () => {
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
    <>{
        session?.idToken ? (<Image alt="profile" height={50} width={50} className="rounded-full" src={session.user?.image? session.user?.image: ""}/>):(
        <>
        <div className="flex">
        <div className="flex items-center justify-center  bg-white">

    <button onClick={signInWithGoogle} className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">

        <Image width={10} height={10} className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>

        <span>Login with Google</span>

    </button>

</div>
        </div>
       
        </>
    )
    }
        </>
   
  );
};

 export { getWallet, Logout, executeTokenTransfer};
export default SignInButton;