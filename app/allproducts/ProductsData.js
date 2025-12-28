import { fetchShopifyProducts, fetchShopifyCollections } from "../lib/shopify";

// This component fetches data and can be wrapped in Suspense
export async function ProductsData({ searchParams }) {
  const category = searchParams?.category || "all";
  const search = searchParams?.search || "";
  const sort = searchParams?.sort || "featured";
  const price = searchParams?.price || "";
  const tag = searchParams?.tag || "";
  const page = parseInt(searchParams?.page) || 1;
  const limit = 30;
  const offset = (page - 1) * limit;

  // Fetch all products AND collections - these will stream in
  const [allProducts, shopifyCollections] = await Promise.all([
    fetchShopifyProducts(100),
    fetchShopifyCollections(20),
  ]);

  // Get unique tags from products - optimized to avoid blocking
  // Process in chunks to yield to main thread
  const allTags = [];
  const tagSet = new Set();
  const chunkSize = 50;
  
  for (let i = 0; i < allProducts.length; i += chunkSize) {
    const chunk = allProducts.slice(i, i + chunkSize);
    chunk.forEach((product) => {
      if (product.tags) {
        product.tags.forEach((tag) => tagSet.add(tag));
      }
    });
  }
  
  allTags.push(...Array.from(tagSet));

  // Fetch actual collection products for counts
  const collectionsWithCounts = await Promise.all(
    shopifyCollections.map(async (collection) => {
      try {
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

  // Apply filters
  let filteredProducts = [...allProducts];

  // Filter by collection/category
  if (category && category !== "all") {
    const selectedCollection = shopifyCollections.find(
      (col) => col.handle === category
    );

    if (selectedCollection) {
      const collectionProducts = await fetchShopifyProducts(100, category);
      filteredProducts = collectionProducts;
    } else {
      filteredProducts = filteredProducts.filter((product) =>
        product.tags?.some((tag) =>
          tag.toLowerCase().includes(category.toLowerCase())
        )
      );
    }
  }

  // Apply other filters
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

  return {
    paginatedProducts,
    totalProducts,
    totalPages,
    categories,
    allTags,
    page,
    limit,
  };
}

