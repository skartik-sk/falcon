"use client";

import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  DiscIcon as Discord,
  Shield,
  Database,
  FileKey,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AnonyShare
            </h3>
            <p className="text-gray-400 text-sm">
              Share your stories anonymously and securely using cutting-edge
              blockchain technology and zero-knowledge proofs.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Discord className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Technology Stack */}
          <div>
            <h3 className="text-white font-semibold mb-4">Technology</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-sm">Anon Aadhar</span>
              </li>
              <li className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                <Database className="h-4 w-4 mr-2" />
                <span className="text-sm">Walrus Storage</span>
              </li>
              <li className="flex items-center text-gray-400 hover:text-purple-400 transition-colors">
                <FileKey className="h-4 w-4 mr-2" />
                <span className="text-sm">Zero Knowledge Proofs</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest updates about our platform and community.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-gray-900/50 border border-purple-900/50 rounded-md text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-900/20 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 AnonyShare. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
