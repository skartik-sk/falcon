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

    </div>
  );
}
