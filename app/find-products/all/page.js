"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
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
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const category = searchParams.get("category");
    return category ? category.split(",") : [];
  });
  const [filteredProducts, setFilteredProducts] = useState(config.products);
  const [openBudget, setOpenBudget] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  // Configure Fuse options
  const fuseOptions = {
    keys: [
      { name: "name", weight: 0.4 },
      { name: "description", weight: 0.3 },
      { name: "tags", weight: 0.2 },
      { name: "category", weight: 0.2 },
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

  const fuse = new Fuse(config.products, fuseOptions);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterProducts = (query, budgets, categories) => {
    let results = config.products;

    if (query.trim()) {
      const fuseResults = fuse.search(query);
      results = fuseResults.map((result) => result.item);
    }

    if (budgets.length > 0) {
      results = results.filter((product) =>
        budgets.some((budgetRange) => {
          const range = PRICE_RANGES.find((b) => b.value === budgetRange);
          if (!range) return false;

          const productMin = parseInt(product.marketingBudget?.min) || 0;
          const productMax = parseInt(product.marketingBudget?.max);

          if (range.max === null) {
            return productMin >= range.min;
          }

          if (productMax) {
            return (
              (productMin >= range.min && productMin <= range.max) ||
              (productMax >= range.min && productMax <= range.max) ||
              (productMin <= range.min && productMax >= range.max)
            );
          }

          return productMin >= range.min && productMin <= range.max;
        })
      );
    }

    if (categories.length > 0) {
      results = results.filter((product) =>
        categories.includes(product.category)
      );
    }

    setFilteredProducts(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(inputValue);

    const params = new URLSearchParams();
    if (inputValue) params.set("search", inputValue);
    if (selectedBudgets.length)
      params.set("budgets", selectedBudgets.join(","));
    if (selectedCategory.length)
      params.set("category", selectedCategory.join(","));

    const newUrl = params.toString()
      ? `/find-products/all?${params.toString()}`
      : "/find-products/all";
    router.replace(newUrl);

    filterProducts(inputValue, selectedBudgets, selectedCategory);
  };

  useEffect(() => {
    filterProducts(searchQuery, selectedBudgets, selectedCategory);
  }, [searchQuery, selectedBudgets, selectedCategory]);

  const handleBudgetSelect = (budget) => {
    setSelectedBudgets((prev) =>
      prev.includes(budget)
        ? prev.filter((b) => b !== budget)
        : [...prev, budget]
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div>
      <div className="container mx-auto px-4 pt-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-gray-100"
          onClick={() => router.push("/find-products")}
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
              placeholder="Search products..."
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
              options={INDUSTRIES.map((c) => ({
                value: c.value,
                label: c.label,
              }))}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              placeholder="Select Category"
              searchPlaceholder="Search categories..."
              emptyMessage="No category found."
            />
          </form>

          {/* Selected Filters Display */}
          {(selectedBudgets?.length > 0 || selectedCategory?.length > 0) && (
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
              {selectedCategory?.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => handleCategorySelect(category)}
                >
                  {CATEGORIES.find((c) => c.value === category)?.label} ×
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          {filteredProducts.length === config.products.length
            ? `Showing all ${config.products.length} products`
            : `Found ${filteredProducts.length} product${
                filteredProducts.length === 1 ? "" : "s"
              }`}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.brandId} product={product} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 my-16">
            <p className="text-xl font-semibold mb-2">No products found</p>
            <p>Try adjusting your search terms or browse all products</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AllProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent />
    </Suspense>
  );
}
