// app/components/CategoryNav.jsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Flower,
  Gift,
  Star,
  Heart,
  Cake,
  Ring,
  Leaf,
  Home,
  Package,
  Droplets,
  Palette,
  Crown,
  Calendar,
  ShoppingBag,
  Zap,
  Sprout,
  Smile,
} from "lucide-react";

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [categories, setCategories] = useState([
    { name: "All", slug: "all", icon: Sparkles, color: "text-stone-700" },
    { name: "Roses", slug: "roses", icon: Flower, color: "text-stone-600" },
    { name: "Bouquets", slug: "bouquets", icon: Gift, color: "text-stone-600" },
    {
      name: "Seasonal",
      slug: "seasonal",
      icon: Leaf,
      color: "text-stone-600",
    },
    { name: "Wedding", slug: "wedding", icon: Ring, color: "text-stone-600" },
    { name: "Birthday", slug: "birthday", icon: Cake, color: "text-stone-600" },
    {
      name: "Romantic",
      slug: "romantic",
      icon: Heart,
      color: "text-stone-600",
    },
    {
      name: "Home Decor",
      slug: "home-decor",
      icon: Home,
      color: "text-stone-600",
    },
    { name: "Premium", slug: "premium", icon: Crown, color: "text-stone-600" },
    {
      name: "Gift Sets",
      slug: "gift-sets",
      icon: Package,
      color: "text-stone-600",
    },
    {
      name: "Fresh Cut",
      slug: "fresh-cut",
      icon: Droplets,
      color: "text-stone-600",
    },
    {
      name: "Color Themes",
      slug: "color-themes",
      icon: Palette,
      color: "text-stone-600",
    },
    {
      name: "Anniversary",
      slug: "anniversary",
      icon: Calendar,
      color: "text-stone-600",
    },
  ]);

  // Optional: Fetch from Shopify collections
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/collections");
        const data = await res.json();
        if (data.collections) {
          setCategories([
            {
              name: "All",
              slug: "all",
              icon: Sparkles,
              color: "text-stone-700",
            },
            ...data.collections.map((col) => ({
              name: col.title,
              slug: col.handle,
              count: col.productsCount || 0,
              color: "text-stone-600",
            })),
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    // Uncomment to fetch dynamically:
    // fetchCategories();
  }, []);

  return (
    <div className="z-40 w-full bg-stone-50/95 backdrop-blur-sm border-b border-stone-200/50">
      <div className="w-full px-0">
        <div className="flex items-center justify-between py-3">
          {/* Category Links - Full width container with hidden scrollbar */}
          <div className="w-full flex items-center gap-2 overflow-x-auto px-4 lg:px-6 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.slug;

              return (
                <Link
                  key={category.slug}
                  href={`/allproducts?category=${category.slug}`}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 flex-shrink-0
                    ${
                      isActive
                        ? "bg-white shadow-sm text-stone-800 border border-stone-300/70"
                        : "text-stone-700 hover:bg-white/90 hover:text-stone-800 hover:border hover:border-stone-200/70"
                    }
                  `}
                >
                  {Icon && (
                    <Icon
                      size={16}
                      className={
                        isActive
                          ? "text-stone-700"
                          : category.color || "text-stone-600"
                      }
                    />
                  )}
                  <span className="font-medium text-sm">{category.name}</span>
                  {category.count && (
                    <span
                      className={`
                      text-xs px-1.5 py-0.5 rounded-full
                      ${
                        isActive
                          ? "bg-stone-100 text-stone-700"
                          : "bg-stone-100/60 text-stone-600"
                      }
                    `}
                    >
                      {category.count}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Right padding for mobile scrolling */}
            <div className="flex-shrink-0 w-4 md:w-8"></div>
          </div>

          {/* View All Button - Only shows when "All" category is NOT active */}
          {activeCategory !== "all" && (
            <Link
              href="/allproducts?category=all"
              onClick={() => setActiveCategory("all")}
              className="hidden md:flex items-center gap-1.5 ml-4 px-4 py-2.5 text-sm font-medium text-white bg-stone-800 rounded-lg hover:bg-stone-900 transition-all shadow-sm hover:shadow flex-shrink-0 mr-4 lg:mr-6"
            >
              <Sparkles size={14} />
              <span>View All</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
