'use client';
import MainPage from "@/components/mainpage";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BuildType, OktoProvider } from "okto-sdk-react";
import { useState } from "react";

export default function Home() {
  const [authToken, setAuthToken] = useState(null);
  const handleLogout = () => {
     console.log("setting auth token to null")
     setAuthToken(null); // Clear the authToken
   };
  return (
    <GoogleOAuthProvider clientId = {'1043490850112-e5f7nk4dogfktgg25ng28t96jp1gfnaf.apps.googleusercontent.com' }>
    <OktoProvider apiKey={"02a1ac80-683f-4d32-b3c4-cb7101f9e2f3"} buildType={BuildType.SANDBOX}>
       <MainPage setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout}  />
  
    </OktoProvider>
        </GoogleOAuthProvider>
   
  );
}
