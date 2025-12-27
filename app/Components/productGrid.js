// components/ProductGrid.jsx (Client Component)
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, Heart, Eye, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductGrid = ({ data }) => {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    } else {
      alert(`Viewing details for ${product.Heading}`);
    }
  };

  const handleWishlist = (product, e) => {
    e.stopPropagation();
    alert(`Added ${product.Heading || product.title} to wishlist!`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <div
          key={item.id || index}
          className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-100"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Image Container - Whole Card */}
          <div
            className="relative h-80 w-full overflow-hidden bg-gradient-to-br from-stone-50 to-amber-50 cursor-pointer"
            onClick={() => handleViewDetails(item)}
          >
            {/* Image */}
            {item.image ? (
              <img
                src={item.image}
                alt={item.altText}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-7xl text-stone-300">🌸</div>
              </div>
            )}

            {/* Hover Overlay with Buttons */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/80 transition-all duration-300 flex items-center justify-center">
              {/* Buttons that appear on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3 p-6">
                <button
                  onClick={(e) => handleAddToCart(item, e)}
                  disabled={!item.inStock}
                  className={`px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-medium border ${
                    item.inStock
                      ? "bg-stone-800 text-white border-stone-900 hover:bg-stone-900"
                      : "bg-stone-100 text-stone-400 cursor-not-allowed border-stone-200"
                  }`}
                >
                  <ShoppingBag size={20} />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(item);
                  }}
                  className="px-6 py-3 bg-white text-stone-800 rounded-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2 font-medium border border-stone-300 hover:border-stone-400"
                >
                  <Eye size={20} />
                  Quick View
                </button>
              </div>
            </div>

            {/* Top Badges - Always visible */}
            {item.tags?.includes("Popular") && (
              <div className="absolute top-4 left-4 z-10">
                <div className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-800 text-xs font-medium rounded-full border border-stone-200 shadow-sm">
                  <Sparkles size={12} className="text-amber-600" />
                  <span>Popular</span>
                </div>
              </div>
            )}

            {/* Wishlist Button - Top right */}
            {/* <button
              onClick={(e) => handleWishlist(item, e)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors border border-stone-200 shadow-sm"
            >
              <Heart size={18} className="text-stone-600" />
            </button> */}

            {/* Info Overlay - Bottom (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900/80 via-stone-900/50 to-transparent p-4">
              <div className="text-white">
                <div className="mb-1"></div>
                <h3 className="text-lg font-bold mb-1 line-clamp-1">
                  {item.Heading || item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{item.price}</span>
                  {item.inStock ? (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-100 rounded-full backdrop-blur-sm">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-amber-500/20 text-amber-100 rounded-full backdrop-blur-sm">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
