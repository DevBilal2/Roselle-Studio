// Products.jsx (Server Component)
import React from "react";
import ProductsGrid from "./ServixeBoxGrid"; // Client component
import SlideInAnimation from "./SlideInAnimation";
import {
  fetchShopifyCollections,
  fetchShopifyProducts,
} from "../../lib/shopify";
import { Flower2, ShoppingBag, ChevronRight } from "lucide-react";

const Products = async () => {
  // Fetch collections from Shopify
  const shopifyCollections = await fetchShopifyCollections(4);

  // If no Shopify collections, use fallback data
  let collectionsData =
    shopifyCollections.length > 0
      ? shopifyCollections
      : [
          {
            id: "1",
            title: "Wedding Collection",
            handle: "wedding",
            description: "Elegant arrangements for weddings",
            products: [
              {
                id: "101",
                Heading: "Bridal Bouquet",
                description:
                  "Custom bridal bouquet with white roses and peonies",
                price: "$129.99",
                tags: ["Wedding", "Bridal", "Premium"],
                inStock: true,
                category: "Wedding",
              },
              {
                id: "102",
                Heading: "Boutonniere Set",
                description:
                  "Matching boutonnieres for the groom and groomsmen",
                price: "$59.99",
                tags: ["Wedding", "Groom", "Formal"],
                inStock: true,
                category: "Wedding",
              },
              {
                id: "103",
                Heading: "Centerpieces",
                description: "Elegant table centerpieces for reception",
                price: "$89.99",
                tags: ["Wedding", "Decor", "Reception"],
                inStock: true,
                category: "Wedding",
              },
              {
                id: "104",
                Heading: "Flower Crown",
                description: "Delicate floral crown for brides",
                price: "$79.99",
                tags: ["Wedding", "Bridal", "Accessories"],
                inStock: true,
                category: "Wedding",
              },
            ],
          },
          {
            id: "2",
            title: "Seasonal Blooms",
            handle: "seasonal",
            description: "Fresh seasonal flowers",
            products: [
              {
                id: "201",
                Heading: "Spring Tulips",
                description: "Bright tulip arrangement for spring",
                price: "$49.99",
                tags: ["Seasonal", "Spring", "Fresh"],
                inStock: true,
                category: "Seasonal",
              },
              {
                id: "202",
                Heading: "Autumn Sunflowers",
                description: "Cheerful sunflower bouquet",
                price: "$39.99",
                tags: ["Seasonal", "Autumn", "Sunflowers"],
                inStock: true,
                category: "Seasonal",
              },
              {
                id: "203",
                Heading: "Winter Poinsettias",
                description: "Festive winter arrangement",
                price: "$59.99",
                tags: ["Seasonal", "Winter", "Holiday"],
                inStock: true,
                category: "Seasonal",
              },
              {
                id: "204",
                Heading: "Summer Lilies",
                description: "Fresh summer lily bouquet",
                price: "$44.99",
                tags: ["Seasonal", "Summer", "Lilies"],
                inStock: true,
                category: "Seasonal",
              },
            ],
          },
          {
            id: "3",
            title: "Premium Arrangements",
            handle: "premium",
            description: "Premium floral designs",
            products: [],
          },
          {
            id: "4",
            title: "Home Decor",
            handle: "home-decor",
            description: "Floral decor for living spaces",
            products: [],
          },
        ];

  // If we have real Shopify collections, fetch products for each collection
  if (shopifyCollections.length > 0) {
    for (const collection of collectionsData) {
      if (collection.handle) {
        try {
          const products = await fetchShopifyProducts(4, collection.handle);
          collection.products = products;
        } catch (error) {
          console.error(
            `Error fetching products for ${collection.title}:`,
            error
          );
          collection.products = [];
        }
      }
    }
  }

  // Filter out collections with no products
  const collectionsWithProducts = collectionsData.filter(
    (collection) =>
      collection.products &&
      Array.isArray(collection.products) &&
      collection.products.length > 0
  );

  // If no collections have products, show a fallback message
  if (collectionsWithProducts.length === 0) {
    return (
      <div
        id="products"
        className="scroll-mt-16 py-20 bg-gradient-to-b from-stone-50 to-white px-4"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200 shadow-sm mb-6">
              <Flower2 size={20} className="text-amber-600" />
              <span className="text-sm font-medium text-stone-700">
                Featured Collections
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
              Our Featured Collections
            </h2>
            <p className="text-stone-600 text-lg">
              Discover beautiful floral arrangements from our curated
              collections
            </p>
          </div>

          <div className="py-20 text-center bg-stone-50/50 rounded-2xl border border-stone-200">
            <div className="text-8xl mb-6 opacity-30">🌸</div>
            <h3 className="text-2xl font-bold text-stone-700 mb-4">
              No Products Available
            </h3>
            <p className="text-stone-600 max-w-md mx-auto mb-8">
              Our collections are currently being updated. Please check back
              soon!
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-3 px-8 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <ShoppingBag size={20} />
              <span>Return to Home</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="products"
      className="scroll-mt-16 py-20 bg-gradient-to-b from-stone-50 to-white px-4"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-stone-200 shadow-sm mb-6">
            <Flower2 size={20} className="text-amber-600" />
            <span className="text-sm font-medium text-stone-700">
              Featured Collections
            </span>
          </div>

          <SlideInAnimation
            delay={400}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6"
          >
            Our Featured Collections
          </SlideInAnimation>
          <SlideInAnimation delay={800} className="text-stone-600 text-lg">
            Discover beautiful floral arrangements from our curated collections
          </SlideInAnimation>
        </div>

        {/* Collections with Products */}
        <div className="space-y-20">
          {collectionsWithProducts.map((collection, collectionIndex) => (
            <div key={collection.id} className="space-y-8">
              {/* Collection Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-2">
                    {collection.title}
                  </h2>
                </div>

                {collection.handle && (
                  <a
                    href={`/allproducts?category=${collection.handle}`}
                    className="group inline-flex items-center gap-2 text-stone-800 hover:text-stone-900 font-medium"
                  >
                    <span>View Collection</span>
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                )}
              </div>

              {/* Products Grid for this Collection */}
              <div>
                <ProductsGrid
                  data={collection.products.slice(0, 4)} // Limit to 4 products per collection
                  collectionName={collection.title}
                />
              </div>

              {/* Divider between collections */}
              {collectionIndex < collectionsWithProducts.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* View All Collections Button */}
        <div className="mt-20 pt-8 border-t border-stone-200">
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-6">
              <p className="text-stone-600 text-lg">Ready to explore more?</p>
              <a
                href="/allproducts"
                className="group inline-flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-xl hover:from-stone-900 hover:to-stone-950 transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold text-lg"
              >
                <ShoppingBag size={24} />
                <span>View All Products</span>
                <ChevronRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
