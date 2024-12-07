"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionProviderComponent from "@/providers/SessionProviderComponent";
import Header from "@/components/header";
// import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import { useState } from "react";
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
  session: any;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderComponent session={session}>
          <div className="flex flex-col">
            <Header />

            {children}
          </div>
        </SessionProviderComponent>
      </body>
    </html>
  );
}
