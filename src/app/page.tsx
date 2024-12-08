"use client";

import CommunitySection from "@/components/community";
import { FAQSection } from "@/components/faqsection";
import { FeaturesSectionDemo } from "@/components/featuresection";
import Footer from "@/components/footer";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button1";
import { Card } from "@/components/ui/card1";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { MessageCircle, Shield, Sparkles, Users } from "lucide-react";
import MainPage from "@/components/mainpage";
import Link from "next/link";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { useState } from "react";

export default function Home() {
  const [authToken, setAuthToken] = useState(null);
  const handleLogout = () => {
    console.log("setting auth token to null");
    setAuthToken(null); // Clear the authToken
  };
  return (
    <>
      <GoogleOAuthProvider
        clientId={
          "1043490850112-1tq082boavjlrovfooila737opscklkv.apps.googleusercontent.com"
        }
      >
        <div>
          <MainPage
            setAuthToken={setAuthToken}
            authToken={authToken}
            handleLogout={handleLogout}
          />

          {/* <ThreeColumnLayout>

        <FeedPage />
      </ThreeColumnLayout> */}
          <main>
            <div className="min-h-screen bg-black text-white">
              {/* Hero Section */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900" />
                <div className="absolute inset-0">
                  <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-transparent" />
                </div>

                {/* Content */}
                <div className="relative pt-40 ">
                  <main className="container mx-auto pt-16  ">
                    <div className="text-center pb-20 space-y-8">
                      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                        Share your problems
                        <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
                          Anonymously & Securely
                        </span>
                      </h1>
                      <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-300">
                        A decentralized platform where you can share your
                        thoughts, experiences, and problems without revealing
                        your identity. Powered by blockchain technology.
                      </p>
                      <div className="flex justify-center gap-4">
                        <Link href={"/feed"}>
                          <Button
                            size="lg"
                            className="bg-gradient-to-r rounded from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            Start Sharing
                          </Button>
                        </Link>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-purple-700 rounded text-white bg-purple-950/50"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="mt-24 px-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      <Card className="p-6  border-purple-900/50 backdrop-blur-sm hover:border-purple-700/50 transition-colors">
                        <Shield className="h-12 w-12 text-purple-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          100% Anonymous
                        </h3>
                        <p className="text-gray-400">
                          Your identity remains completely private. Share
                          without fear.
                        </p>
                      </Card>
                      <Card className="p-6 bg-black/50 border-blue-900/50 backdrop-blur-sm hover:border-blue-700/50 transition-colors">
                        <MessageCircle className="h-12 w-12 text-blue-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          Community Support
                        </h3>
                        <p className="text-gray-400">
                          Connect with others who understand and want to help.
                        </p>
                      </Card>
                      <Card className="p-6 bg-black/50 border-green-900/50 backdrop-blur-sm hover:border-green-700/50 transition-colors">
                        <Sparkles className="h-12 w-12 text-green-400 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          Earn Rewards
                        </h3>
                        <p className="text-gray-400">
                          Get tokens for meaningful contributions and support.
                        </p>
                      </Card>
                    </div>

                    {/* Circular Feature */}
                    <CommunitySection />
                    {/* <FeaturesSectionDemo /> */}
                    {/* CTA Section */}
                    <div className="mt-32 text-center">
                      <Card className="py-16 bg-gradient-to-br from-purple-900/100 via-black to-blue-900/100 border-none">
                        <h2 className="text-2xl text-gd sm:text-3xl font-bold mb-4">
                          Ready to Share Your Story?
                        </h2>
                        <p className="text-gray-300 mb-8">
                          Connect your wallet and start sharing anonymously
                          today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Input
                            placeholder="Enter your email for updates"
                            className="max-w-xs mx-auto sm:mx-0 bg-black/50 border-purple-900"
                          />
                          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                            Get Started
                          </Button>
                        </div>
                      </Card>
                    </div>

                    <FAQSection />
                  </main>
                </div>
              </div>
            </div>
          </main>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
