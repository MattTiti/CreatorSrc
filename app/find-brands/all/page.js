"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BrandCard from "@/components/BrandCard";
import config from "@/config";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Badge } from "@/components/ui/badge";
import MultiSelect from "@/components/MultiSelect";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { Combobox } from "@/components/ui/combobox";
import { PRICE_RANGES, INDUSTRIES } from "@/libs/constants";
export const dynamic = "force-dynamic";

function SearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );
  const [selectedBudgets, setSelectedBudgets] = useState(() => {
    const budgets = searchParams.get("budgets");
    return budgets ? budgets.split(",") : [];
  });
  const [selectedIndustry, setSelectedIndustry] = useState(() => {
    const industry = searchParams.get("industry");
    return industry ? industry.split(",") : [];
  });
  const [filteredBrands, setFilteredBrands] = useState(config.brands);
  const [openBudget, setOpenBudget] = useState(false);

  // Configure Fuse options
  const fuseOptions = {
    keys: [
      { name: "displayName", weight: 0.4 },
      { name: "about", weight: 0.3 },
      { name: "tags", weight: 0.2 },
      { name: "industry", weight: 0.2 },
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

  const fuse = new Fuse(config.brands, fuseOptions);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterBrands = (query, budgets, industries) => {
    let results = config.brands;

    if (query.trim()) {
      const fuseResults = fuse.search(query);
      results = fuseResults.map((result) => result.item);
    }

    if (budgets.length > 0) {
      results = results.filter((brand) =>
        budgets.some((budgetRange) => {
          const range = PRICE_RANGES.find((b) => b.value === budgetRange);
          if (!range) return false;

          const brandMin = parseInt(brand.marketBudget?.min) || 0;
          const brandMax = parseInt(brand.marketBudget?.max);

          if (range.max === null) {
            return brandMin >= range.min;
          }

          if (brandMax) {
            return (
              (brandMin >= range.min && brandMin <= range.max) ||
              (brandMax >= range.min && brandMax <= range.max) ||
              (brandMin <= range.min && brandMax >= range.max)
            );
          }

          return brandMin >= range.min && brandMin <= range.max;
        })
      );
    }

    if (industries.length > 0) {
      results = results.filter((brand) => INDUSTRIES.includes(brand.industry));
    }

    setFilteredBrands(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);

    const params = new URLSearchParams();
    if (inputValue) params.set("search", inputValue);
    if (selectedBudgets.length)
      params.set("budgets", selectedBudgets.join(","));
    if (selectedIndustry.length)
      params.set("industry", selectedIndustry.join(","));

    const newUrl = params.toString()
      ? `/find-brands/all?${params.toString()}`
      : "/find-brands/all";
    router.replace(newUrl);

    filterBrands(inputValue, selectedBudgets, selectedIndustry);
  };

  useEffect(() => {
    filterBrands(searchQuery, selectedBudgets, selectedIndustry);
  }, [searchQuery, selectedBudgets, selectedIndustry]);

  const handleBudgetSelect = (budget) => {
    setSelectedBudgets((prev) =>
      prev.includes(budget)
        ? prev.filter((b) => b !== budget)
        : [...prev, budget]
    );
  };

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <div>
      <div className="container mx-auto px-4 pt-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-gray-100"
          onClick={() => router.push("/find-brands")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="container mx-auto py-4 px-4">
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              type="search"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search brands..."
              className="w-full"
            />

            <MultiSelect
              options={PRICE_RANGES}
              value={selectedBudgets}
              onChange={handleBudgetSelect}
              placeholder="Budget Range"
              isOpen={openBudget}
              onOpenChange={setOpenBudget}
            />

            <Combobox
              options={INDUSTRIES.map((i) => ({
                value: i.value,
                label: i.label,
              }))}
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
              placeholder="Select Industry"
              searchPlaceholder="Search industries..."
              emptyMessage="No industry found."
            />
          </form>

          {/* Selected Filters Display */}
          {(selectedBudgets?.length > 0 || selectedIndustry.length > 0) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedBudgets?.map((budget) => (
                <Badge
                  key={budget}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleBudgetSelect(budget)}
                >
                  {PRICE_RANGES.find((b) => b.value === budget)?.label} ×
                </Badge>
              ))}
              {selectedIndustry.map((industry) => (
                <Badge
                  key={industry}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedIndustry((prev) =>
                      prev.filter((i) => i !== industry)
                    )
                  }
                >
                  {INDUSTRIES.find((i) => i.value === industry)?.label} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {filteredBrands.length === config.brands.length
            ? `Showing all ${config.brands.length} brands`
            : `Found ${filteredBrands.length} brand${
                filteredBrands.length === 1 ? "" : "s"
              }`}
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.userId} brand={brand} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredBrands.length === 0 && (
          <div className="text-center text-gray-500 my-16">
            <p className="text-xl font-semibold mb-2">No brands found</p>
            <p>Try adjusting your search terms or browse all brands</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllBrandsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
