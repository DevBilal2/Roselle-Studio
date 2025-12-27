// app/allproducts/page.jsx (UPDATED VERSION)
import React from "react";
import { fetchShopifyProducts, fetchShopifyCollections } from "../lib/shopify";
import ProductGrid from "../Components/productGrid";
import FiltersClient from "../Components/FilterClient";
import SearchSortBar from "../Components/SearchBar";
import PaginationClient from "../Components/PaginationClient";
import Link from "next/link";

export const metadata = {
  title: "All Products | Roselle Studio",
  description: "Browse our complete collection of elegant floral arrangements",
};

export default async function AllProductsPage(props) {
  const searchParams = await props.searchParams;

  // Extract search params
  const category = searchParams?.category || "all";
  const search = searchParams?.search || "";
  const sort = searchParams?.sort || "featured";
  const price = searchParams?.price || "";
  const tag = searchParams?.tag || "";
  const page = parseInt(searchParams?.page) || 1;
  const limit = 30;
  const offset = (page - 1) * limit;

  // Fetch all products AND collections
  const [allProducts, shopifyCollections] = await Promise.all([
    fetchShopifyProducts(100),
    fetchShopifyCollections(20),
  ]);

  // Get unique tags from products
  const allTags = [
    ...new Set(allProducts.flatMap((product) => product.tags || [])),
  ];

  // 🎯 FIXED: Fetch actual collection products for counts
  const collectionsWithCounts = await Promise.all(
    shopifyCollections.map(async (collection) => {
      try {
        // Fetch actual products from this collection
        const collectionProducts = await fetchShopifyProducts(
          100,
          collection.handle
        );
        return {
          id: collection.handle,
          name: collection.title,
          count: collectionProducts.length,
          isShopifyCollection: true,
          collectionData: collection,
        };
      } catch (error) {
        console.error(
          `Error fetching products for ${collection.title}:`,
          error
        );
        return {
          id: collection.handle,
          name: collection.title,
          count: 0,
          isShopifyCollection: true,
          collectionData: collection,
        };
      }
    })
  );

  // Create categories array
  const categories = [
    {
      id: "all",
      name: "All Products",
      count: allProducts.length,
    },
    ...collectionsWithCounts,
  ];

  // 🎯 FIXED: Apply filters - fetch collection products when needed
  let filteredProducts = [...allProducts];

  // Filter by collection/category
  if (category && category !== "all") {
    // Check if it's a Shopify collection
    const selectedCollection = shopifyCollections.find(
      (col) => col.handle === category
    );

    if (selectedCollection) {
      // 🎯 FIX: Fetch ACTUAL products from this collection
      console.log(`Fetching products for collection: ${category}`);
      const collectionProducts = await fetchShopifyProducts(100, category);
      filteredProducts = collectionProducts;
      console.log(`Found ${collectionProducts.length} products in ${category}`);
    } else {
      // Fallback to tag-based filtering (for non-collection categories)
      filteredProducts = filteredProducts.filter((product) =>
        product.tags?.some((tag) =>
          tag.toLowerCase().includes(category.toLowerCase())
        )
      );
    }
  }

  // Apply other filters (search, tag, price)
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.Heading?.toLowerCase().includes(searchTerm) ||
        product.title?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
    );
  }

  if (tag) {
    filteredProducts = filteredProducts.filter((product) =>
      product.tags?.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  if (price) {
    filteredProducts = filteredProducts.filter((product) => {
      const priceStr = product.price || "0";
      const productPrice = parseFloat(priceStr.replace(/[^\d.-]/g, "") || 0);
      switch (price) {
        case "under-500":
          return productPrice < 500;
        case "500-1000":
          return productPrice >= 500 && productPrice <= 1000;
        case "1000-2000":
          return productPrice >= 1000 && productPrice <= 2000;
        case "over-2000":
          return productPrice > 2000;
        default:
          return true;
      }
    });
  }

  // Apply sorting
  switch (sort) {
    case "price-low":
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(
          (a.price || "0").replace(/[^\d.-]/g, "") || 0
        );
        const priceB = parseFloat(
          (b.price || "0").replace(/[^\d.-]/g, "") || 0
        );
        return priceA - priceB;
      });
      break;
    case "price-high":
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(
          (a.price || "0").replace(/[^\d.-]/g, "") || 0
        );
        const priceB = parseFloat(
          (b.price || "0").replace(/[^\d.-]/g, "") || 0
        );
        return priceB - priceA;
      });
      break;
    case "newest":
      filteredProducts.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return (b.id || "").localeCompare(a.id || "");
      });
      break;
    case "name":
      filteredProducts.sort((a, b) =>
        (a.Heading || a.title || "").localeCompare(b.Heading || b.title || "")
      );
      break;
  }

  // Paginate
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);
  const paginatedProducts = filteredProducts.slice(offset, offset + limit);

  // 🎯 DEBUG: Log what's happening
  console.log("=== DEBUG INFO ===");
  console.log("Total products:", allProducts.length);
  console.log(
    "Collections:",
    shopifyCollections.map((c) => ({
      name: c.title,
      handle: c.handle,
      count: collectionsWithCounts.find((cc) => cc.id === c.handle)?.count || 0,
    }))
  );
  console.log("Current category:", category);
  console.log("Filtered products:", filteredProducts.length);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Products</h1>
          <p className="text-xl text-stone-300 max-w-3xl">
            Discover our complete collection of {totalProducts} elegant floral
            arrangements
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <FiltersClient categories={categories} allTags={allTags} />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <SearchSortBar />

            {/* Results Info */}
            <div className="mb-6">
              <p className="text-stone-600">
                Showing{" "}
                <span className="font-bold text-stone-800">
                  {paginatedProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-stone-800">
                  {totalProducts}
                </span>{" "}
                products
                {category !== "all" && (
                  <span className="ml-2 text-stone-700 font-medium">
                    in "
                    {categories.find((c) => c.id === category)?.name ||
                      category}
                    "
                  </span>
                )}
              </p>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <ProductGrid data={paginatedProducts} />
                <PaginationClient
                  currentPage={page}
                  totalPages={totalPages}
                  totalProducts={totalProducts}
                  limit={limit}
                />
              </>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4 text-stone-300">🌸</div>
                <h3 className="text-2xl font-bold text-stone-800 mb-2">
                  No products found
                </h3>
                <p className="text-stone-600 mb-6">
                  {category !== "all"
                    ? `No products found in "${
                        categories.find((c) => c.id === category)?.name ||
                        category
                      }". Try another collection.`
                    : "Try adjusting your search or filter criteria"}
                </p>
                <a
                  href="/allproducts"
                  className="px-6 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition-colors border border-stone-900"
                >
                  {category !== "all"
                    ? "View All Products"
                    : "Clear All Filters"}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
