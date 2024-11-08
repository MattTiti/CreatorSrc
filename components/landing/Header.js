"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/app/icon.png";
import config from "@/config";

const Header = ({ className }) => {
  return (
    <header
      className={cn(
        "bg-white/80 backdrop-blur-sm border-b border-neutral-200",
        className
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt={`${config.appName} logo`}
            className="w-8 h-8"
            width={32}
            height={32}
          />
          <span className="font-semibold text-lg text-neutral-700">
            {config.appName}
          </span>
        </Link>

        {/* Right side - Navigation */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-700">
            <Link
              href="/creators"
              className="hover:text-neutral-900 transition-colors"
            >
              Find a Creator
            </Link>
            <Link
              href="/brands"
              className="hover:text-neutral-900 transition-colors"
            >
              Find a Brand
            </Link>
            <Link
              href="/products"
              className="hover:text-neutral-900 transition-colors"
            >
              Find a Product
            </Link>
          </nav>

          <Button variant="outline" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
