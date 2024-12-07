import React, { useState } from 'react'
import Header from './header'
import { useOkto } from 'okto-sdk-react';



const MainPage = ({ setAuthToken, authToken, handleLogout }) => {
  //  useEffect(() => {
  //   const fetchWallets = async () => {
  //     try {
  //         if (createWallet) {
  //             const details = await createWallet();
  //     console.log(details);
  //           } else {
  //             setError('getUserDetails is not defined');
  //           }
  
  
  //     } catch (error) {
  //       setError(`Failed to fetch wallets: ${error.message}`);
  //     }
  //   };
  //   fetchWallets();
  //  }, [])

  return (
    <>
    <Header setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout} />
  
    
    </>
  )
}

export default MainPage