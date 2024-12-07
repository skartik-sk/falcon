"use client";

import * as React from "react";

export default function PortfolioPage() {
  const portfolioData = [
    {
      name: "Will Bitcoin reach $100K by 2024?",
      invested: "$5,000",
      potentialPayout: "$12,000",
      status: "Active",
      prediction: "Yes",
      probability: "65%",
    },
    {
      name: "Will Tesla release a flying car by 2025?",
      invested: "$3,000",
      potentialPayout: "$7,000",
      status: "Active",
      prediction: "No",
      probability: "45%",
    },
    {
      name: "Will AI outperform humans in coding competitions by 2026?",
      invested: "$2,500",
      potentialPayout: "$6,500",
      status: "Closed",
      prediction: "Yes",
      probability: "75%",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Your Portfolio</h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {portfolioData.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-br from-purple-700 to-indigo-900 rounded-lg shadow-md text-white"
          >
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <div className="flex flex-col gap-1">
              <p>
                <strong>Invested:</strong> {item.invested}
              </p>
              <p>
                <strong>Potential Payout:</strong> {item.potentialPayout}
              </p>
              <p>
                <strong>Prediction:</strong> {item.prediction}
              </p>
              <p>
                <strong>Probability:</strong> {item.probability}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    item.status === "Active"
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  {item.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
