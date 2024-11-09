"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreatorCard from "@/components/CreatorCard";
import config from "@/config";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Fuse from "fuse.js";
import { Badge } from "@/components/ui/badge";
import MultiSelect from "@/components/MultiSelect";
export const dynamic = "force-dynamic";

const PRICE_RANGES = [
  { value: "0-50", label: "$0 - $50" },
  { value: "51-100", label: "$51 - $100" },
  { value: "101-200", label: "$101 - $200" },
  { value: "201+", label: "$201+" },
];

const PLATFORMS = [
  { value: "youtube", label: "YouTube" },
  { value: "twitch", label: "Twitch" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
];

// Create a separate component for the search functionality
function SearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );
  const [selectedPrices, setSelectedPrices] = useState(() => {
    const prices = searchParams.get("prices");
    return prices ? prices.split(",") : [];
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState(() => {
    const platforms = searchParams.get("platforms");
    return platforms ? platforms.split(",") : [];
  });
  const [filteredCreators, setFilteredCreators] = useState(config.creators);
  const [openPrice, setOpenPrice] = useState(false);
  const [openPlatforms, setOpenPlatforms] = useState(false);

  // Configure Fuse options
  const fuseOptions = {
    keys: [
      { name: "name", weight: 0.4 },
      { name: "bio", weight: 0.3 },
      { name: "tags", weight: 0.2 },
      { name: "priceRange", weight: 0.1 },
    ],
    threshold: 0.4,
    distance: 100,
    minMatchCharLength: 2,
    includeScore: true,
    shouldSort: true,
    findAllMatches: true,
    ignoreLocation: true,
    useExtendedSearch: true,
  };

  // Initialize Fuse instance
  const fuse = new Fuse(config.creators, fuseOptions);

  // Handle input changes without searching
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Filter creators based on search query using Fuse
  const filterCreators = (query, prices, platforms) => {
    let results = config.creators;

    // Apply Fuse search if query exists
    if (query.trim()) {
      const fuseResults = fuse.search(query);
      results = fuseResults.map((result) => result.item);
    }

    // Apply price filters
    if (prices.length > 0) {
      results = results.filter((creator) =>
        prices.some((price) => creator.priceRange === price)
      );
    }

    // Apply platform filters
    if (platforms.length > 0) {
      results = results.filter((creator) =>
        platforms.some((platform) => creator.platforms.includes(platform))
      );
    }

    setFilteredCreators(results);
  };

  // Handle search on form submit
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);

    // Update URL with all filters
    const params = new URLSearchParams();
    if (inputValue) params.set("search", inputValue);
    if (selectedPrices.length) params.set("prices", selectedPrices.join(","));
    if (selectedPlatforms.length)
      params.set("platforms", selectedPlatforms.join(","));

    const newUrl = params.toString()
      ? `/browse-creators?${params.toString()}`
      : "/browse-creators";
    router.replace(newUrl);

    // Filter creators using all criteria
    filterCreators(inputValue, selectedPrices, selectedPlatforms);
  };

  // Initial filter on mount
  useEffect(() => {
    filterCreators(searchQuery, selectedPrices, selectedPlatforms);
  }, [searchQuery, selectedPrices, selectedPlatforms]);

  const handlePriceSelect = (value) => {
    setSelectedPrices((current) => {
      const currentPrices = current || []; // Ensure we have an array
      if (currentPrices.includes(value)) {
        return currentPrices.filter((item) => item !== value);
      }
      return [...currentPrices, value];
    });
  };

  const handlePlatformSelect = (value) => {
    setSelectedPlatforms((current) => {
      const currentPlatforms = current || []; // Ensure we have an array
      if (currentPlatforms.includes(value)) {
        return currentPlatforms.filter((item) => item !== value);
      }
      return [...currentPlatforms, value];
    });
  };

  return (
    <div>
      <div className="container mx-auto py-8 px-4">
        {/* Search Section */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4 items-start">
            <div className="flex-1">
              <Input
                type="search"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search creators..."
                className="w-full rounded-full"
              />
            </div>

            {/* Price Range Multi-select */}
            <MultiSelect
              options={PRICE_RANGES}
              value={selectedPrices}
              onChange={handlePriceSelect}
              placeholder="Price Range"
              isOpen={openPrice}
              onOpenChange={setOpenPrice}
            />

            {/* Platforms Multi-select */}
            <MultiSelect
              options={PLATFORMS}
              value={selectedPlatforms}
              onChange={handlePlatformSelect}
              placeholder="Platforms"
              isOpen={openPlatforms}
              onOpenChange={setOpenPlatforms}
            />

            <Button type="submit" className="rounded-full px-8">
              Search
            </Button>
          </form>

          {/* Selected Filters Display */}
          {(selectedPrices?.length > 0 || selectedPlatforms?.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedPrices?.map((price) => (
                <Badge
                  key={price}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handlePriceSelect(price)}
                >
                  {PRICE_RANGES.find((p) => p.value === price)?.label} ×
                </Badge>
              ))}
              {selectedPlatforms?.map((platform) => (
                <Badge
                  key={platform}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handlePlatformSelect(platform)}
                >
                  {PLATFORMS.find((p) => p.value === platform)?.label} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {filteredCreators.length === config.creators.length
            ? `Showing all ${config.creators.length} creators`
            : `Found ${filteredCreators.length} creator${
                filteredCreators.length === 1 ? "" : "s"
              }`}
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredCreators.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-xl font-semibold mb-2">No creators found</p>
            <p>Try adjusting your search terms or browse all creators</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main page component
export default function BrowseCreatorsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">Loading...</div>
        </div>
      }
    >
      <SearchComponent />
    </Suspense>
  );
}
