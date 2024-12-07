// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { createCoinbaseWalletSDK } from '@coinbase/wallet-sdk';
// import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';

 
// const GRADIENT_BORDER_WIDTH = 2;
 

// function Gradient({ children, style, isAnimationDisabled = false }:{children: React.ReactNode, style: React.CSSProperties, isAnimationDisabled: boolean}) {
//   const [isAnimating, setIsAnimating] = useState(false);
//   const gradientStyle = useMemo(() => {
//     const rotate = isAnimating ? '720deg' : '0deg';
//     return {
//       transform: `rotate(${rotate})`,
//       transition: isAnimating
//         ? 'transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)'
//         : 'none',
//       ...style,
//     };
//   }, [isAnimating, style]);
 
//   const handleMouseEnter = useCallback(() => {
//     if (isAnimationDisabled || isAnimating) return;
//     setIsAnimating(true);
//   }, [isAnimationDisabled, isAnimating, setIsAnimating]);
 
//   useEffect(() => {
//     if (!isAnimating) return;
//     const animationTimeout = setTimeout(() => {
//       setIsAnimating(false);
//     }, 2000);
//     return () => {
//       clearTimeout(animationTimeout);
//     };
//   }, [isAnimating]);
 
//   return (
//     <div style={{ position: 'relative' }} onMouseEnter={handleMouseEnter}>
//       <div className="gradient-background" style={gradientStyle} />
//       {children}
//     </div>
//   );
// }
 
// const sdk =  createCoinbaseWalletSDK({
//   appName: 'My Dapp With Vanilla SDK',
//   appLogoUrl: 'https://example.com/logo.png',
//   appChainIds: [84532],
// });
 
// const provider = sdk.getProvider();
 
// export function BlackCreateWalletButton({ height = 66, width = 200 }) {
//   const minButtonHeight = 48;
//   const minButtonWidth = 200;
//   const buttonHeight = Math.max(minButtonHeight, height);
//   const buttonWidth = Math.max(minButtonWidth, width);
//   const gradientDiameter = Math.max(buttonHeight, buttonWidth);
//   const styles = useMemo(
//     () => ({
//       gradientContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'black',
//         borderRadius: buttonHeight / 2,
//         height: buttonHeight,
//         width: buttonWidth,
//         boxSizing: 'border-box' as const,
//         overflow: 'hidden',
//       },
//       gradient: {
//         background:
//           'conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)',
//         position: 'absolute' as const,
//         top: -buttonHeight - GRADIENT_BORDER_WIDTH,
//         left: -GRADIENT_BORDER_WIDTH,
//         width: gradientDiameter,
//         height: gradientDiameter,
//       },
//       buttonBody: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         boxSizing: 'border-box' as const,
//         backgroundColor: '#000000',
//         height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
//         width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
//         fontFamily: 'Arial, sans-serif',
//         fontWeight: 'bold',
//         fontSize: 18,
//         borderRadius: buttonHeight / 2,
//         position: 'relative' as const,
//         paddingRight: 10,
//       },
//     }),
//     [buttonHeight, buttonWidth, gradientDiameter]
//   );
//   const handleSuccess = (address: string) => {
//     console.log('Wallet created with address:', address);
//   };

//   const handleError = (error: any) => {
//     console.error('Error creating wallet:', error);
//   };

//   const createWallet = useCallback(async () => {
//     try {
//       const [address] = await provider.request({
//         method: 'eth_requestAccounts',
//       });
//       console.log(address);
//       handleSuccess(address);
//     } catch (error) {
//       handleError(error);
//     }
//   }, [handleSuccess, handleError]);
 
//   return (
//     <button style={{  border: '1px solid transparent',
//         boxSizing: 'border-box',}} onClick={createWallet}>
//       <div style={styles.gradientContainer}>
//         <Gradient style={styles.gradient} isAnimationDisabled={false}>
//           <div style={styles.buttonBody}>
//             <CoinbaseWalletLogo containerStyles={{ paddingTop: 10 }} />
//             Create Wallet
//           </div>
//         </Gradient>
//       </div>
//     </button>
//   );
// }


import React from 'react'

const BlackCreateWalletButton = () => {
  return (
    <div>BlackCreateWalletButton</div>
  )
}

export default BlackCreateWalletButton