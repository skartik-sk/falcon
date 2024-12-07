// import {
//   LogInWithAnonAadhaar,
//   useAnonAadhaar,
//   AnonAadhaarProof,
//   useProver,
// } from "@anon-aadhaar/react";
// import { useEffect } from "react";

// type Verified = {
//   verified: string | null;
//   Dis: boolean;
// };
// export default function Home({ verified, Dis }: Verified) {
//   const [anonAadhaar] = useAnonAadhaar();
//   const [, latestProof] = useProver();

//   useEffect(() => {
//     console.log("Anon Aadhaar status: ", anonAadhaar.status);
//   }, [anonAadhaar]);

//   return (
//     <>
//       {!verified && Dis && (
//         <div>
//           <LogInWithAnonAadhaar nullifierSeed={1234} />

//           {/* <p>{anonAadhaar?.status}</p> */}
//         </div>
//       )}
//     </>
//   );
// }
