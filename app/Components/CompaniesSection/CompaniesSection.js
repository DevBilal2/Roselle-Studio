import React from "react";
import { fetchShopifyCollections } from "../../lib/shopify";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

export default async function CollectionsSection() {
  const collections = await fetchShopifyCollections(4);

  const collectionData =
    collections.length > 0
      ? collections
      : [
          {
            id: 1,
            title: "Wedding Collection",
            image: "/api/placeholder/800/500",
            subtitle: "Elegant floral arrangements",
            count: "24 premium designs",
            bgColor:
              "bg-gradient-to-br from-stone-900/90 via-stone-900/50 to-amber-900/30",
            handle: "wedding", // Added handle
          },
          {
            id: 2,
            title: "Seasonal Blooms",
            image: "/api/placeholder/800/500",
            subtitle: "Nature-inspired designs",
            count: "18 seasonal items",
            bgColor:
              "bg-gradient-to-br from-amber-900/90 via-amber-900/50 to-stone-900/30",
            handle: "seasonal", // Added handle
          },
          {
            id: 3,
            title: "Premium Arrangements",
            image: "/api/placeholder/800/500",
            subtitle: "Luxury floral masterpieces",
            count: "32 luxury pieces",
            bgColor:
              "bg-gradient-to-br from-stone-800/90 via-stone-800/50 to-amber-800/30",
            handle: "premium", // Added handle
          },
          {
            id: 4,
            title: "Custom Designs",
            image: "/api/placeholder/800/500",
            subtitle: "Personalized creations",
            count: "15 custom options",
            bgColor:
              "bg-gradient-to-br from-amber-800/90 via-amber-800/50 to-stone-800/30",
            handle: "custom", // Added handle
          },
          {
            id: 5,
            title: "Home Decor",
            image: "/api/placeholder/800/500",
            subtitle: "Beautiful living spaces",
            count: "22 decor items",
            bgColor:
              "bg-gradient-to-br from-stone-700/90 via-stone-700/50 to-amber-700/30",
            handle: "home-decor", // Added handle
          },
          {
            id: 6,
            title: "Gift Collections",
            image: "/api/placeholder/800/500",
            subtitle: "Perfect floral gifts",
            count: "28 gift options",
            bgColor:
              "bg-gradient-to-br from-amber-700/90 via-amber-700/50 to-stone-700/30",
            handle: "gift", // Added handle
          },
          {
            id: 7,
            title: "Anniversary Specials",
            image: "/api/placeholder/800/500",
            subtitle: "Romantic milestone blooms",
            count: "16 anniversary designs",
            bgColor:
              "bg-gradient-to-br from-stone-900/90 via-amber-900/50 to-stone-800/30",
            handle: "anniversary", // Added handle
          },
          {
            id: 8,
            title: "Office Elegance",
            image: "/api/placeholder/800/500",
            subtitle: "Professional workplace decor",
            count: "20 office pieces",
            bgColor:
              "bg-gradient-to-br from-amber-800/90 via-stone-800/50 to-amber-700/30",
            handle: "office", // Added handle
          },
        ];

  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mb-6">
            Featured Collections
          </h2>
          <p className="text-stone-600 text-xl max-w-3xl mx-auto">
            Explore our most beautiful floral collections
          </p>
        </div>

        {/* Collections Grid - 2x4 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {collectionData.map((collection) => {
            // Get the collection handle for the URL parameter
            const collectionHandle =
              collection.handle || collection.id.toString();

            return (
              <div key={collection.id} className="group">
                {/* Collection Card */}
                <a
                  href={`/allproducts?category=${collectionHandle}`}
                  className="block relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Background Image/Color */}
                  <div className="absolute inset-0 bg-gradient-to-br from-stone-100 to-amber-100">
                    {/* Collection Image */}
                    {collection.image ? (
                      <Image
                        src={collection.image}
                        alt={collection.altText || collection.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      /* Fallback icon if no image */
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-7xl opacity-50">
                          {getCollectionIcon(collection.title)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Overlay Gradient */}
                  <div
                    className={`absolute inset-0 ${collection.bgColor}`}
                  ></div>

                  {/* Text Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-white/90 mb-1">{collection.subtitle}</p>
                    <p className="text-white/80 text-sm">{collection.count}</p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="px-6 py-3 bg-white text-stone-900 font-semibold rounded-full flex items-center gap-2">
                      Shop Now
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-stone-700 text-lg">
              Discover our complete collection
            </p>
            <a
              href="/allproducts"
              className="inline-flex items-center gap-4 px-10 py-5 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all duration-300 shadow-2xl hover:shadow-3xl text-xl font-semibold group"
            >
              View All Products
              <ChevronRight
                size={24}
                className="group-hover:translate-x-2 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function for icons
function getCollectionIcon(title) {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("Men")) return "💍";
  if (titleLower.includes("women")) return "🌸";
  if (titleLower.includes("attar")) return "💎";
  if (titleLower.includes("aspire")) return "✨";
  if (titleLower.includes("home")) return "🏠";
  if (titleLower.includes("gift")) return "🎁";
  if (titleLower.includes("anniversary")) return "❤️";
  if (titleLower.includes("office")) return "💼";
  return "🌺";
}
