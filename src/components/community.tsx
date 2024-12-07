"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Shield,
  Lock,
  Users,
  Database,
  FileKey,
  Share2,
  BookLock,
  MessageSquareMore,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommunitySection() {
  return (
    <div className="min-h-screen pt-32 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-gray-400 text-lg">
            Experience secure and anonymous sharing powered by cutting-edge
            technology
          </p>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl opacity-20" />
            <div className="flex flex-col md:flex-row gap-8   md:gap-24">
              <motion.div>
                <div className="relative w-44 h-44 rounded-full border border-purple-500/30 flex flex-col items-center justify-center p-4">
                  <BookLock className="w-8 h-8 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    100%
                  </div>
                  <div className="text-sm text-gray-400">Secured</div>
                </div>
              </motion.div>

              <motion.div>
                <div className="relative w-44 h-44  rounded-full border border-purple-500/30 flex flex-col items-center justify-center p-4">
                  <Users className="w-8 h-8 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    10,000+
                  </div>
                  <div className="text-sm text-gray-400">Anonymous Stories</div>
                </div>
              </motion.div>
              <motion.div>
                <div className="relative w-44 h-44  rounded-full border border-purple-500/30 flex flex-col items-center justify-center p-4">
                  <MessageSquareMore className="w-8 h-8 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Chat
                  </div>
                  <div className="text-sm text-gray-400">Anonmously</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Anon Aadhar Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="p-6 bg-black/50 border-purple-900/50 backdrop-blur-sm hover:border-purple-700/50 transition-all">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-purple-900/20 group-hover:bg-gradient-to-r from-purple-600 to-blue-600">
                  <Shield className="w-6 h-6 text-purple-400 group-hover:text-white" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-white">
                  Anon Aadhar Integration
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Verify your identity privately using Zero-Knowledge proofs. Anon
                Aadhar integration ensures your Aadhar credentials remain
                confidential while proving authenticity.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <FileKey className="w-4 h-4 mr-2 text-purple-400" />
                  Zero-Knowledge Proof Verification
                </li>
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-purple-400" />
                  Private Identity Verification
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Walrus Storage Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="p-6 bg-black/50 border-blue-900/50 backdrop-blur-sm hover:border-blue-700/50 transition-all">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-blue-900/20 group-hover:bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Database className="w-6 h-6 text-blue-400 group-hover:text-white" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-white">
                  Secure Storage
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Your data is encrypted and securely stored using Walrus,
                ensuring maximum privacy and protection. Benefit from
                decentralized storage with enterprise-grade security.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-blue-400" />
                  End-to-End Encryption
                </li>
                <li className="flex items-center">
                  <Database className="w-4 h-4 mr-2 text-blue-400" />
                  Decentralized Storage
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Community Features Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="p-6 bg-black/50 border-green-900/50 backdrop-blur-sm hover:border-green-700/50 transition-all">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-lg bg-green-900/20 group-hover:bg-gradient-to-r from-green-600 to-emerald-600">
                  <Share2 className="w-6 h-6 text-green-400 group-hover:text-white" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-white">
                  Community Features
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Connect with others while maintaining your privacy. Share
                stories, provide support, and engage in meaningful discussions
                within our secure platform.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-400" />
                  Anonymous Interactions
                </li>
                <li className="flex items-center">
                  <Share2 className="w-4 h-4 mr-2 text-green-400" />
                  Secure Content Sharing
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
