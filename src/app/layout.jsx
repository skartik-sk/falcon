"use client";

import localFont from "next/font/local";
import "./globals.css";

// import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { RainbowProvider } from "@/context/rainbow.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { WagmiProvider } from "wagmi";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} text-white bg-black ${geistMono.variable} antialiased`}
      >
        <RainbowProvider>
          <AnonAadhaarProvider _useTestAadhaar={true}>
            <Header />
            {children}
            <ToastContainer />
            <Footer />
          </AnonAadhaarProvider>
        </RainbowProvider>
      </body>
    </html>
  );
}
