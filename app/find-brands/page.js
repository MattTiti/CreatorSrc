"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BrandCard from "@/components/BrandCard";
import FloatingCards from "@/components/FloatingCards";
import Link from "next/link";
import { useRouter } from "next/navigation";
import config from "@/config";
import { Star, Store } from "lucide-react";
import { useState } from "react";

export default function BrandsPage() {
  const brands = config.brands.slice(0, 6); // Show only first 6 brands on main page
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/find-brands/all?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  return (
    <div>
      {/* Hero Search Section */}
      <div className="sticky top-0 min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-blue-100 relative">
        {/* Background Cards */}
        <div className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4">
          <FloatingCards />
        </div>

        {/* Blur Overlay */}
        <div className="absolute inset-0 backdrop-blur-sm" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto rounded-2xl p-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Store className="w-11 h-11 text-black/80" />
              <h1 className="text-5xl font-bold text-black/80">Find Brands</h1>
            </div>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands by name, industry, or budget range..."
                className="w-full h-12 text-lg rounded-full border-gray-200 shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white/70"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Brands Grid Section */}
      <div className="bg-white rounded-t-[2.5rem] relative z-20 border-t border-gray-200 px-4 -mt-8">
        <div className="container mx-auto py-12 px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-semibold flex items-center gap-3">
              <Star className="w-8 h-8 text-gray-700" />
              Featured Brands
            </h2>
            <Link href="/find-brands/all">
              <Button variant="outline" className="hover:bg-gray-100">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand.userId} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
