"use client";

// import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';

import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
// const  { authenticate } = useOkto() as OktoContextType;

// const getWallet = async (auth_token: string) => {
//   console.log(auth_token);
//   const url = "https://sandbox-api.okto.tech/api/v1/wallet";
//   const options = {
//     method: "GET",
//     headers: { Authorization: "Bearer YOUR_SECRET_TOKEN" },
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };
// const Logout = async (auth_token: string) => {
//   const url = "https://sandbox-api.okto.tech/api/v1/logout";
//   const options = {
//     method: "POST",
//     headers: { Authorization: `Bearer ${auth_token} ` },
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// type TransferResponse = {
//   // Define the expected structure of the API response
//   status: string;
//   message?: string;
//   data?: any; // Replace `any` with a more specific type if known
// };

// async function executeTokenTransfer(
//   networkName: string,
//   tokenAddress: string,
//   quantity: string,
//   recipientAddress: string,
//   auth_token:string
// ): Promise<TransferResponse> {
//   const url = "https://sandbox-api.okto.tech/api/v1/transfer/tokens/execute";
// console.log(auth_token);
//   const body = JSON.stringify({
//     network_name: networkName,
//     token_address: tokenAddress,
//     quantity: quantity,
//     recipient_address: recipientAddress,
//   });

//   const options: RequestInit = {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer YOUR_SECRET_TOKEN", 
//     },
//     body: body,
//   };

//   try {
//     const response = await fetch(url, options);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data: TransferResponse = await response.json();
//     console.log("Transfer successful:", data);
//     return data; // Return data for further use
//   } catch (error) {
//     console.error("Error executing token transfer:", error);
//     throw error; // Rethrow error for the caller to handle
//   }
// }

// const createWalletOkto = async (auth_token: string) => {
//   const url = "https://sandbox-api.okto.tech/api/v1/user_from_token";
//   const options = {
//     method: "GET",
//     headers: { Authorization: `Bearer ${auth_token} ` },
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

const SignInButton = ({ setAuthToken, authToken, handleLogout }) => {

  const rounter = useRouter();
  const  test  = useOkto();
  const authenticate = test?.authenticate;
  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);
    if (authenticate) {
     
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);
        setAuthToken(authResponse.auth_token);
        console.log("auth token received", authToken);
       
        rounter.push("/");
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    }
  
  );

    }
    else{
      console.error("authenticate is not defined");
    }
  };
  // const signInWithGoogle = async () => {
  //   // onConnect();
  //   await signIn("google"); // Redirect after sign-in
  // };
 
  const onLogoutClick = () => {
    handleLogout(); // Clear the authToken
    rounter.push('/'); // Navigate back to the login page
  };



  return (
    <><div>
      {!authToken ? (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={ (error) => {
            console.log("Login Failed", error);
          }}
          useOneTap
          promptMomentNotification={(notification) =>
            console.log("Prompt moment notification:", notification)
          }
        />
      ) : (
        <button onClick={onLogoutClick}>Authenticated, Logout</button>
      )}
    </div>
        </>
   
  );
};
export default SignInButton;