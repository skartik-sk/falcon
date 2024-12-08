"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { useState } from "react";
import { WagmiConfig, WagmiProvider } from 'wagmi'
import { config } from './lib/config'
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} text-white bg-black ${geistMono.variable} antialiased`}
      >
     

     <WagmiProvider config={config}>
     <QueryClientProvider client={queryClient}>
<RainbowKitProvider>

      {children}
</RainbowKitProvider>
      </QueryClientProvider>
      </WagmiProvider>


   
    
      </body>
    </html>
  );
}
