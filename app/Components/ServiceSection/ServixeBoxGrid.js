"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  ChevronDown,
  ChevronUp,
  Eye,
  Star,
} from "lucide-react";
import { useCart } from "../../context/CartContext";

const ProductsGrid = ({ data }) => {
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(4);
  const [expanded, setExpanded] = useState(false);
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 768) setVisibleCount(2);
      else if (width < 1024) setVisibleCount(3);
      else setVisibleCount(4);
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const visibleItems = expanded ? data : data.slice(0, visibleCount);

  const gridColsClass = expanded
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : visibleCount === 1
    ? "grid-cols-1"
    : visibleCount === 2
    ? "grid-cols-2"
    : visibleCount === 3
    ? "grid-cols-3"
    : "grid-cols-4";

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1);
    openCart();
  };

  const handleViewDetails = (product) => {
    if (product.handle) {
      router.push(`/products/${product.handle}`);
    } else if (product.id) {
      router.push(`/products/${product.id}`);
    }
  };

  const handleWishlist = (product, e) => {
    e.stopPropagation();
    console.log("Added to wishlist:", product);
  };

  return (
    <div className="w-full">
      {/* Grid */}
      <div className={`grid gap-6 ${gridColsClass}`}>
        {visibleItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Image Container - Whole Card */}
            <div
              className="relative h-96 w-full overflow-hidden bg-gradient-to-br from-stone-50 to-amber-50 cursor-pointer"
              onClick={() => handleViewDetails(item)}
            >
              {/* Image */}
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.altText}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-9xl opacity-20">🌸</div>
                </div>
              )}

              {/* Hover Overlay with Buttons */}
              <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/60 transition-all duration-300 flex items-center justify-center">
                {/* Buttons that appear on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3 p-6">
                  <button
                    onClick={(e) => handleAddToCart(item, e)}
                    className="px-6 py-3 bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-lg hover:from-stone-900 hover:to-stone-950 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-medium"
                  >
                    <ShoppingBag size={20} />
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(item);
                    }}
                    className="px-6 py-3 bg-white text-stone-900 rounded-lg hover:bg-stone-100 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-medium"
                  >
                    <Eye size={20} />
                    View Details
                  </button>
                </div>
              </div>

              {/* Top Badges - Always visible */}
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-stone-800 to-stone-900 text-white text-xs font-medium rounded-full shadow-md">
                  <Star size={12} />
                  <span>Premium</span>
                </div>
              </div>

              {/* Wishlist Button - Top right */}

              {/* Info Overlay - Bottom (always visible) */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/80 via-stone-900/50 to-transparent p-5">
                <div className="text-white">
                  <h3 className="text-lg font-bold mb-1 line-clamp-1">
                    {item.Heading || item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{item.price}</span>
                    {item.inStock && (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-100 rounded-full backdrop-blur-sm">
                        In Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {data.length > visibleCount && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-8 py-3 bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
          >
            {expanded ? "Show Less" : `View All ${data.length} Products`}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
