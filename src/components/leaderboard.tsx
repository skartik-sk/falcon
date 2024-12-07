"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

// Helper function to generate random wallet addresses
const generateWalletAddress = () => {
  const chars = "0123456789abcdef";
  const start = Array(10)
    .fill(0)
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
  const end = Array(8)
    .fill(0)
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
  return `0x${start}......${end}`;
};

// Helper function to generate random points
const generatePoints = () => Math.floor(Math.random() * 10000);

// Generate leaderboard data
const leaderboardData = Array(10)
  .fill(0)
  .map((_, index) => ({
    sno: index + 1,
    walletAddress: generateWalletAddress(),
    points: generatePoints(),
  }));

export default function Leaderboard() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6  rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Leaderboard
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-900/20">
              <th className="px-4 py-2 text-left text-sm font-semibold text-purple-400">
                S.No.
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-purple-400">
                Wallet Address
              </th>
              <th className="px-4 py-2 text-right text-sm font-semibold text-purple-400">
                Respect
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, index) => (
              <motion.tr
                key={entry.sno}
                className="border-b border-purple-900/10 hover:bg-purple-900/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="px-4 py-3 text-gray-400">
                  {entry.sno === 1 && (
                    <Trophy className="inline-block w-5 h-5 mr-2 text-yellow-500" />
                  )}
                  {entry.sno === 2 && (
                    <Trophy className="inline-block w-5 h-5 mr-2 text-gray-400" />
                  )}
                  {entry.sno === 3 && (
                    <Trophy className="inline-block w-5 h-5 mr-2 text-orange-600" />
                  )}
                  {entry.sno}
                </td>
                <td className="px-4 py-3 text-gray-400 font-mono">
                  {entry.walletAddress}
                </td>
                <td className="px-4 py-3 text-right text-gray-400">
                  {entry.points.toLocaleString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
