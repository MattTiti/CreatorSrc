"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BrandCard from "@/components/find/BrandCard";
import FloatingCards from "@/components/find/FloatingCards";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Store, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function BrandsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBrands = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/brand/featured");

      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }

      const data = await response.json();
      setBrands(data.brands.slice(0, 6)); // Show only first 6 brands
    } catch (error) {
      console.error("Error fetching brands:", error);
      // Optionally show error toast here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

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
              <Store className="w-8 h-8 sm:w-11 sm:h-11 text-black/80" />
              <h1 className="text-2xl sm:text-5xl font-bold text-black/80">
                Find Brands
              </h1>
            </div>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto">
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands by name, industry, or budget range..."
                className="w-full h-12 text-lg rounded-full border-gray-200 shadow-sm focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white/70 text-sm sm:text-base"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Brands Grid Section */}
      <div className="bg-white rounded-t-[2.5rem] relative z-20 border-t border-gray-200 px-4 -mt-8">
        <div className="container mx-auto py-12 px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl sm:text-3xl font-semibold flex items-center gap-1 sm:gap-3">
              <Star className="w-8 h-8 text-gray-700" />
              Featured Brands
            </h2>
            <Link href="/find-brands/all">
              <Button variant="outline" className="hover:bg-gray-100">
                View All
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : brands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              No featured brands found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
