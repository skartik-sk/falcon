"use client";

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { useState } from "react";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} text-white bg-black ${geistMono.variable} antialiased`}
      >
        <GoogleOAuthProvider session={session}>
          <div className="flex flex-col">
            <Header />

            {children}
            <Footer />
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
