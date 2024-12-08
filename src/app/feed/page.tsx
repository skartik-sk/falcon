"use client";
import React, { useEffect, useState } from "react";
import ThreeColumnLayout from "../../components/three-column-layout";
import FeedPage from "@/components/feed-page";
// import { request } from "graphql-request";

// interface ContractDataResponse {
//   myContractData: string; // Change this to match the actual structure of your data
// }

// const fetchSmartContractData = async () => {
//   const query = `
//     {
//       myContractData
//     }
//   `;

//   const data = await request<ContractDataResponse>("/api/graphql", query);
//   return data.myContractData;
// };
export default function Page() {
  const [contractData, setContractData] = useState("");

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await fetchSmartContractData();
  //     setContractData(data);
  //   };
  //   getData();
  // }, []);
  return (
    <div className="relative bg-gradient-to-br from-purple-900/50 via-black to-blue-900/30 text-white">
      <div className="z-40 relative">
        {" "}
        {/* Ensure the content is above gradients */}
        <ThreeColumnLayout>
          <FeedPage />
        </ThreeColumnLayout>
      </div>

      <div className="z-10 absolute inset-0">
        {" "}
        <div className="relative min-h-screen text-white">
          {/* Gradient Container */}
          <div className="absolute inset-0 z-10"></div>
          {/* Set gradients behind content */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-blue-900/30" />
          <div className="absolute inset-0">
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-transparent" />
          </div>
        </div>
        {/* Content */}
        <div className="relative z-20"></div>
      </div>
    </div>
  );
}
