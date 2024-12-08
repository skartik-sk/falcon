import React, { useState } from "react";
import { useOkto } from "okto-sdk-react";
import { useRouter } from "next/navigation";

const ReadData = ({ authToken, handleLogout }) => {
  console.log("readdata component rendered: ", authToken);
  const router = useRouter();
  const [error, setError] = useState('');
  const test = useOkto();
  const logOut = test?.logOut;
  const getUserDetails = test?.getUserDetails;
    const getPortfolio = test?.getPortfolio;
    const createWallet = test?.createWallet;

  
  const fetchUserDetails = async () => {
    try {
      if (getUserDetails) {
        const details = await getUserDetails();
console.log(details);
      } else {
        setError('getUserDetails is not defined');
      }


    } catch (error) {
      setError(`Failed to fetch user details: ${error.message}`);
    }
  };
  const fetchPortfolio = async () => {
    try {
        if (getPortfolio) {
            const details = await getPortfolio();
    console.log(details);
          } else {
            setError('getUserDetails is not defined');
          }

    } catch (error) {
      setError(`Failed to fetch portfolio: ${error.message}`);
    }
  };
  const fetchWallets = async () => {
    try {
        if (createWallet) {
            const details = await createWallet();
    console.log(details);
          } else {
            setError('getUserDetails is not defined');
          }


    } catch (error) {
      setError(`Failed to fetch wallets: ${error.message}`);
    }
  };
  const logout = async () => {
    try {
        if (logOut) {
            logOut();
          }
      handleLogout();
      router.push("/");
    } catch (error) {
      setError(`Failed to log out: ${error.message}`);
    }
  };

  const buttonStyle = {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  };
  // const formStyle = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   width: '100%',
  //   maxWidth: '400px',
  // };
  // const inputStyle = {
  //   margin: '5px',
  //   padding: '10px',
  //   width: '100%',
  //   fontSize: '16px',
  // };


  return (
    <div style={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',}}>
      
      <div>
        <button style={buttonStyle} onClick={fetchUserDetails}>View User Details</button>
        <button style={buttonStyle} onClick={fetchPortfolio}>View Portfolio</button>
        <button style={buttonStyle} onClick={fetchWallets}>View Wallets</button>
        <button style={buttonStyle} onClick={logout}>Log Out</button>
      </div>
      
      
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
export default ReadData;