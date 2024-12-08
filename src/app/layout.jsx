"use client";

import localFont from "next/font/local";
import "./globals.css";

// import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { RainbowProvider } from "@/context/rainbow.jsx";

import "@rainbow-me/rainbowkit/styles.css";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

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
        <AnonAadhaarProvider _useTestAadhaar={true}>
          <RainbowProvider>{children}</RainbowProvider>
        </AnonAadhaarProvider>
      </body>
    </html>
  );
}
