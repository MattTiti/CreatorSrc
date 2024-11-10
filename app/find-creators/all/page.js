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
import { ArrowLeft } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { PRICE_RANGES, PLATFORMS } from "@/libs/constants";
export const dynamic = "force-dynamic";

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

  // Configure Fuse options
  const fuseOptions = {
    keys: [
      { name: "displayName", weight: 0.4 },
      { name: "about", weight: 0.3 },
      { name: "tags", weight: 0.2 },
      { name: "shortTitle", weight: 0.2 },
      { name: "platforms", weight: 0.1 },
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
        prices.some((priceRange) => {
          const range = PRICE_RANGES.find((p) => p.value === priceRange);
          if (!range) return false;

          const creatorMin = creator.priceRange?.min || 0;
          const creatorMax = creator.priceRange?.max;

          // Handle "$10K+" range
          if (range.max === null) {
            return creatorMin >= range.min;
          }

          // If creator has a price range (min and max)
          if (creatorMax) {
            // Check if creator's range overlaps with selected range
            return (
              (creatorMin >= range.min && creatorMin <= range.max) || // Min price falls within range
              (creatorMax >= range.min && creatorMax <= range.max) || // Max price falls within range
              (creatorMin <= range.min && creatorMax >= range.max) // Creator's range encompasses the selected range
            );
          }

          // If creator only has a minimum price
          return creatorMin >= range.min && creatorMin <= range.max;
        })
      );
    }

    // Update platform filtering to handle platforms array
    if (platforms.length > 0) {
      results = results.filter((creator) =>
        creator.platforms?.some((platform) => platforms.includes(platform))
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
      ? `/find-creators/all?${params.toString()}`
      : "/find-creators/all";
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

  return (
    <div>
      <div className="container mx-auto px-4 pt-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-gray-100"
          onClick={() => router.push("/find-creators")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="container mx-auto py-4 px-4">
        {/* Search Section */}
        <div className="mb-8">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Input
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search creators..."
              className="w-full"
            />

            <MultiSelect
              options={PRICE_RANGES}
              value={selectedPrices}
              onChange={handlePriceSelect}
              placeholder="Price Range"
              isOpen={openPrice}
              onOpenChange={setOpenPrice}
            />

            <Combobox
              options={PLATFORMS.map((p) => ({
                value: p.value,
                label: p.label,
              }))}
              value={selectedPlatforms}
              onValueChange={setSelectedPlatforms}
              placeholder="Select Platforms"
              searchPlaceholder="Search platforms..."
              emptyMessage="No platform found."
            />
          </form>

          {/* Selected Filters Display */}
          {(selectedPrices?.length > 0 || selectedPlatforms.length > 0) && (
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
              {selectedPlatforms.map((platform) => (
                <Badge
                  key={platform}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedPlatforms((prev) =>
                      prev.filter((p) => p !== platform)
                    )
                  }
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
            <CreatorCard key={creator.username} creator={creator} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredCreators.length === 0 && (
          <div className="text-center text-gray-500 my-16">
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
