"use client";

import * as React from "react";
import { LogOut, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { logoutGoogle } from "./okto/utls";
import FeedPage from "@/components/feed-page";
import Leaderboard from "./leaderboard";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import PortfolioPage from "./portfolio";
// import MarketsPage from "@/components/markets-page"; // Example, import other components as needed
// import PortfolioPage from "@/components/portfolio-page"; // Example, import other components as needed
// import LeaderboardPage from "@/components/leaderboard-page"; // Example, import other components as needed
interface VerifiedUser {
  name: string;
  address: string;
  nftImage: string;
}

const verifiedUsers: VerifiedUser[] = [
  {
    name: "CryptoWhale",
    address: "0x1234...5678",
    nftImage:
      "https://openseauserdata.com/files/cf4094e3a61a4c6dab72bd94a5f253df.png",
  },
  {
    name: "BlockchainBoss",
    address: "0xabcd...efgh",
    nftImage:
      "https://www.nimbleappgenie.com/blogs/wp-content/uploads/2023/01/66.png",
  },
  {
    name: "TokenMaster",
    address: "0x9876...5432",
    nftImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQskK8bc4O3OArNEKNumZJssAuzLtYGHXsr0g&s",
  },
];

interface ThreeColumnLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ThreeColumnLayout({
  children,
  className,
}: ThreeColumnLayoutProps) {
  const [activeTab, setActiveTab] = React.useState<string>("Home");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={cn("flex min-h-screen text-white", className)}>
      {/* Mobile Menu Button */}
      <Sheet>
        <SheetTrigger
          asChild
          className="lg:hidden fixed left-4 top-20 z-8 text-white  border-none"
        >
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[240px] sm:w-[300px] text-white "
        >
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" onClick={() => handleTabChange("Home")}>
              Home
            </Button>
            <Button variant="ghost" onClick={() => handleTabChange("Markets")}>
              Markets
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleTabChange("Portfolio")}
            >
              Portfolio
            </Button>
            <Button
              variant="ghost"
              onClick={() => handleTabChange("Leaderboard")}
            >
              Leaderboard
            </Button>
            <Button variant="ghost" onClick={logoutGoogle} className="">
              Logout <LogOut />
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Left Sidebar - Navigation */}
      <nav className="hidden mt-24 items-start lg:flex w-[240px] flex-col  border-[#c0c0c023] border-r-[2px] p-6 text-white ">
        <div className="flex flex-col items-start mb-[22rem] gap-4">
          <Button variant="ghost" onClick={() => handleTabChange("Home")}>
            Home
          </Button>
          <Button variant="ghost" onClick={() => handleTabChange("Markets")}>
            Markets
          </Button>
          <Button variant="ghost" onClick={() => handleTabChange("Portfolio")}>
            Portfolio
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleTabChange("Leaderboard")}
          >
            Leaderboard
          </Button>
        </div>
        <Button variant="ghost" onClick={logoutGoogle} className="">
          Logout <LogOut />
        </Button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 mt-24 px-4 py-6 lg:px-8 overflow-y-auto max-h-[100vh] ">
        {activeTab === "Home" && <FeedPage />}
        {/* {activeTab === "Markets" && <MarketsPage />} */}
        {activeTab === "Portfolio" && <PortfolioPage />}
        {activeTab === "Leaderboard" && <Leaderboard />}
      </main>

      {/* Right Sidebar - Verified Users */}
      <aside className="w-[300px]  pt-20 border-[#c0c0c023] border-l-[2px]  p-6">
        <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Verified Users
        </h2>
        <div className="space-y-6">
          {verifiedUsers.map((user, index) => (
            <motion.div
              key={user.address}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="relative">
                <img
                  src={user.nftImage}
                  alt={`${user.name}'s NFT`}
                  className="w-12 h-12 rounded-full border-2 border-purple-500"
                />
                <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-green-500 bg-black rounded-full" />
              </div>
              <div>
                <h3 className="text-white font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.address}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </aside>
    </div>
  );
}
