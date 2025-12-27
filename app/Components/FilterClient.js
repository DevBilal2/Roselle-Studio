// components/FiltersClient.jsx (FIXED - NO PAGE RELOADS)
"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Filter, X, Tag } from "lucide-react";

export default function FiltersClient({ categories, allTags }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "all";
  const currentPrice = searchParams.get("price") || "";
  const currentTag = searchParams.get("tag") || "";
  const currentSearch = searchParams.get("search") || "";

  // Create URL with updated search params
  const createQueryString = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Reset page when filters change
    if (!updates.page && updates.page !== 0) {
      params.delete("page");
    }

    return params.toString();
  };

  // Handle filter click WITHOUT page reload
  const handleFilterClick = (updates) => {
    const queryString = createQueryString(updates);
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  // Check if any filters are active
  const hasActiveFilters =
    currentCategory !== "all" || currentPrice || currentTag || currentSearch;

  // Clear all filters
  const clearAllFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // Clear specific filter
  const clearFilter = (filterName) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(filterName);
    params.delete("page"); // Reset to page 1
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sticky top-8">
      {/* Active Filters Header */}
      {hasActiveFilters && (
        <div className="mb-6 pb-4 border-b border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-stone-800">Active Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-stone-600 hover:text-stone-800 flex items-center gap-1"
            >
              <X size={14} />
              Clear All
            </button>
          </div>

          {/* Active Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {currentCategory !== "all" && (
              <div className="flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm border border-stone-200">
                <span>
                  Category:{" "}
                  {categories.find((c) => c.id === currentCategory)?.name ||
                    currentCategory}
                </span>
                <button
                  onClick={() => clearFilter("category")}
                  className="ml-1 text-stone-800 hover:text-stone-900"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {currentPrice && (
              <div className="flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm border border-stone-200">
                <span>
                  Price:{" "}
                  {[
                    { label: "Under 500", value: "under-500" },
                    { label: "500 - 1000", value: "500-1000" },
                    { label: "1000 - 2000", value: "1000-2000" },
                    { label: "Over 2000", value: "over-2000" },
                  ].find((r) => r.value === currentPrice)?.label ||
                    currentPrice}
                </span>
                <button
                  onClick={() => clearFilter("price")}
                  className="ml-1 text-stone-800 hover:text-stone-900"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {currentTag && (
              <div className="flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm border border-stone-200">
                <Tag size={12} className="text-stone-600" />
                <span>Tag: {currentTag}</span>
                <button
                  onClick={() => clearFilter("tag")}
                  className="ml-1 text-stone-800 hover:text-stone-900"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {currentSearch && (
              <div className="flex items-center gap-1 px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm border border-stone-200">
                <span>Search: "{currentSearch}"</span>
                <button
                  onClick={() => clearFilter("search")}
                  className="ml-1 text-stone-800 hover:text-stone-900"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
          <Filter size={18} className="text-stone-600" />
          Categories
          {currentCategory !== "all" && (
            <button
              onClick={() => clearFilter("category")}
              className="ml-auto text-xs text-stone-600 hover:text-stone-800"
            >
              Clear
            </button>
          )}
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                handleFilterClick({
                  category: category.id,
                  page: 1,
                })
              }
              className={`w-full text-left flex items-center justify-between py-2 px-3 rounded-lg transition-colors group border ${
                currentCategory === category.id
                  ? "bg-stone-800 text-white border-stone-900 shadow-sm"
                  : "text-stone-600 hover:bg-stone-50 border-stone-100"
              }`}
            >
              <div className="flex items-center gap-2">
                {currentCategory === category.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
                <span
                  className={
                    currentCategory === category.id ? "font-medium" : ""
                  }
                >
                  {category.name}
                </span>
              </div>
              <span
                className={`text-sm ${
                  currentCategory === category.id
                    ? "text-stone-200 font-medium"
                    : "text-stone-400"
                }`}
              >
                ({category.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-stone-800">Price Range</h3>
          {currentPrice && (
            <button
              onClick={() => clearFilter("price")}
              className="text-xs text-stone-600 hover:text-stone-800"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {[
            { label: "Under 500", value: "under-500" },
            { label: "500 - 1000", value: "500-1000" },
            { label: "1000 - 2000", value: "1000-2000" },
            { label: "Over 2000", value: "over-2000" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() =>
                handleFilterClick({
                  price: range.value,
                  page: 1,
                })
              }
              className={`w-full text-left block py-2 px-3 rounded-lg transition-colors border ${
                currentPrice === range.value
                  ? "bg-stone-800 text-white border-stone-900 shadow-sm font-medium"
                  : "text-stone-600 hover:bg-stone-50 border-stone-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-stone-800">Popular Tags</h3>
          {currentTag && (
            <button
              onClick={() => clearFilter("tag")}
              className="text-xs text-stone-600 hover:text-stone-800"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() =>
                handleFilterClick({
                  tag: tag.toLowerCase(),
                  page: 1,
                })
              }
              className={`px-3 py-1 text-sm rounded-full transition-all flex items-center gap-1 border ${
                currentTag === tag.toLowerCase()
                  ? "bg-stone-800 text-white border-stone-900 shadow-sm"
                  : "bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200"
              }`}
            >
              <Tag
                size={12}
                className={
                  currentTag === tag.toLowerCase()
                    ? "text-white"
                    : "text-stone-600"
                }
              />
              {tag}
              {currentTag === tag.toLowerCase() && (
                <X size={12} className="ml-1" />
              )}
            </button>
          ))}
        </div>

        {/* Clear Tag Filter Button (when tag is selected) */}
        {currentTag &&
          allTags.slice(0, 10).some((t) => t.toLowerCase() === currentTag) ===
            false && (
            <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-100">
              <div className="flex items-center justify-between">
                <span className="text-stone-700 text-sm">
                  Active tag: <strong>{currentTag}</strong>
                </span>
                <button
                  onClick={() => clearFilter("tag")}
                  className="text-stone-600 hover:text-stone-800 text-sm flex items-center gap-1"
                >
                  <X size={14} />
                  Remove
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
