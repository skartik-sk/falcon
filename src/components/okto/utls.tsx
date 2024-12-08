"use client";

// import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';

import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app/lib/constant";
import {  useWriteContract } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
const SignInButton = ({ setAuthToken, authToken, handleLogout }) => {

  const rounter = useRouter();
  const  test  = useOkto();
  const authenticate = test?.authenticate;
  const { 
    data: hash, 
    writeContract 
  } = useWriteContract() 

  async function registerUsers() {
  
  writeContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'registerUser',
    args: ['', '','',''],
  })
  console.log(hash);
}
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
        
        registerUsers().then((response) => {
        console.log("User registered: ", response);

        // rounter.push("/anon");
        


       
      }).catch((error) => {
        console.error("Failed to register user: ", error);
      }
      );
      } else {
        console.error("Failed to authenticate: ", error);
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
      
        <ConnectButton/>
         
     
    </div>
        </>
   
  );
};
export default SignInButton;
