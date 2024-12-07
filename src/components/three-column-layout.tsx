"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ThreeColumnLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ThreeColumnLayout({
  children,
  className,
}: ThreeColumnLayoutProps) {
  return (
    <div className={cn("flex min-h-screen bg-background", className)}>
      {/* Mobile Menu Button */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden absolute left-4 top-20 z-8">
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <nav className="flex flex-col gap-4">
            <Button variant="ghost" className="justify-start">
              Home
            </Button>
            <Button variant="ghost" className="justify-start">
              Markets
            </Button>
            <Button variant="ghost" className="justify-start">
              Portfolio
            </Button>
            <Button variant="ghost" className="justify-start">
              Leaderboard
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Left Sidebar - Navigation */}
      <nav className="hidden mt-24 lg:flex w-[240px] flex-col gap-4 border-r p-6">
        <Button variant="ghost" className="justify-start">
          Home
        </Button>
        <Button variant="ghost" className="justify-start">
          Markets
        </Button>
        <Button variant="ghost" className="justify-start">
          Portfolio
        </Button>
        <Button variant="ghost" className="justify-start">
          Leaderboard
        </Button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 mt-24 px-4 py-6 lg:px-8 overflow-y-auto">
        {children}
      </main>

      {/* Right Sidebar - Verified Users */}
      <aside className="hidden mt-24 lg:block w-[300px] border-l p-6">
        <h2 className="text-lg font-semibold mb-4">Verified Users</h2>
        {/* Content will be added later */}
      </aside>
    </div>
  );
}
