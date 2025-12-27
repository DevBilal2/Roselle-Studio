// Components/SearchSortBar.jsx (FIXED - NO RELOADS)
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchSortBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("featured");

  // Initialize from URL on component mount
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
    setSortValue(searchParams.get("sort") || "featured");
  }, [searchParams]);

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

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Update URL after typing stops (debounce)
    const timeoutId = setTimeout(() => {
      const queryString = createQueryString({
        search: value || null,
        page: 1,
      });
      router.push(`${pathname}?${queryString}`, { scroll: false });
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const queryString = createQueryString({
      search: searchValue || null,
      page: 1,
    });
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortValue(value);

    const queryString = createQueryString({
      sort: value,
      page: 1,
    });
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  // Clear search
  const clearSearch = () => {
    setSearchValue("");
    const queryString = createQueryString({
      search: null,
      page: 1,
    });
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search - FIXED */}
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit(e);
                }
              }}
              placeholder="Search products..."
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            {searchValue && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Sort - FIXED */}
        <div className="flex items-center gap-4">
          <select
            value={sortValue}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
