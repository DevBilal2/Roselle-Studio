// app/products/[handle]/page.js
import ProductDetail from "../../Components/DetailPage/ProductDetail";
import { fetchProductByHandle, fetchShopifyProducts } from "../../lib/shopify";
import { notFound } from "next/navigation";

// Note: Cannot use runtime: 'edge' with generateStaticParams
// Static generation provides better performance for product pages

export default async function ProductPage({ params }) {
  const { handle } = await params;

  // Fetch product data from Shopify
  const product = await fetchProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Transform Shopify data to match component structure
  const transformedProduct = {
    id: product.id,
    Heading: product.title,
    handle: product.handle,
    description: product.description?.replace(/<[^>]*>/g, "").substring(0, 150),
    fullDescription: product.description?.replace(/<[^>]*>/g, ""),
    brand: product.vendor || "BLOOMCRAFT",
    image: product.featuredImage?.url,
    images: product.images?.edges?.map((edge) => edge.node.url) || [],
    price: `$${product.priceRange?.minVariantPrice?.amount || "0"}`,
    originalPrice: product.compareAtPrice ? `$${product.compareAtPrice}` : null,
    tags: product.tags || [],
    colors: product.options?.find((opt) => opt.name === "Color")?.values || [],
    sizes: product.options?.find((opt) => opt.name === "Size")?.values || [],
    isNew: product.tags?.includes("new") || false,
    bestSeller: product.tags?.includes("best-seller") || false,
    discount: product.compareAtPrice
      ? Math.round(
          (1 -
            parseFloat(product.priceRange?.minVariantPrice?.amount) /
              parseFloat(product.compareAtPrice)) *
            100
        )
      : null,
    shipping: "Free delivery on orders over $50",
    inStock: product.variants?.edges[0]?.node?.availableForSale || false,
  };

  return <ProductDetail product={transformedProduct} />;
}

// Generate static paths for product pages
export async function generateStaticParams() {
  // Fetch all product handles from Shopify
  const products = await fetchShopifyProducts(100);
  return products.map((product) => ({
    handle: product.handle,
  }));
}
