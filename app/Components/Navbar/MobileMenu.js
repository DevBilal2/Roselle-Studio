"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

const featuredCategories = [
  {
    title: "By Occasion",
    items: [
      { name: "Birthday Flowers", href: "/allproducts?category=birthday" },
      { name: "Anniversary Bouquets", href: "/allproducts?category=anniversary" },
      { name: "Wedding Flowers", href: "/allproducts?category=wedding" },
      { name: "Sympathy & Funeral", href: "/allproducts?category=sympathy" },
      { name: "Congratulations", href: "/allproducts?category=congratulations" },
    ],
  },
  {
    title: "By Type",
    items: [
      { name: "Fresh Cut Flowers", href: "/allproducts?type=fresh" },
      { name: "Potted Plants", href: "/allproducts?type=potted" },
      { name: "Succulents", href: "/allproducts?type=succulents" },
      { name: "Seasonal Arrangements", href: "/allproducts?type=seasonal" },
      { name: "Dried Flowers", href: "/allproducts?type=dried" },
    ],
  },
  {
    title: "Collections",
    items: [
      { name: "Best Sellers", href: "/allproducts?collection=bestsellers" },
      { name: "New Arrivals", href: "/allproducts?collection=new" },
      { name: "Premium Luxury", href: "/allproducts?collection=premium" },
      { name: "Budget Friendly", href: "/allproducts?collection=budget" },
      { name: "Custom Designs", href: "/allproducts?collection=custom" },
    ],
  },
  {
    title: "Special Offers",
    items: [
      { name: "Weekly Specials", href: "/allproducts?offer=weekly" },
      { name: "Clearance Sale", href: "/allproducts?offer=clearance" },
      { name: "Subscription Plans", href: "/subscriptions" },
      { name: "Gift Packages", href: "/allproducts?type=gift-packages" },
      { name: "Corporate Orders", href: "/corporate" },
    ],
  },
];

export default function MobileMenu({ navLinks }) {
  const [open, setOpen] = useState(false);
  const [featuredOpen, setFeaturedOpen] = useState(false);

  return (
    <>
      {/* MENU BUTTON */}
      <button
        className="p-2 text-stone-900"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* MENU PANEL */}
      {open && (
        <ul
          id="mobile-menu"
          className="
            fixed top-16 left-4
            w-80 p-4
            rounded-2xl
            shadow-2xl
            border border-stone-200
            bg-gradient-to-br
            from-stone-50
            via-white
            to-stone-100
            backdrop-blur-xl
            z-[9999]
            animate-in fade-in zoom-in-95
          "
        >
          {navLinks.map((link) => (
            <li key={link.name} className="py-2">
              <a
                href={link.href}
                className="
                  flex items-center gap-3
                  px-3 py-2 rounded-lg
                  text-stone-900 font-medium
                  hover:bg-stone-200/50
                  transition-all duration-200
                "
                onClick={() => setOpen(false)}
              >
                {link.icon && (
                  <link.icon size={16} className="text-stone-700" />
                )}
                {link.name}
              </a>
            </li>
          ))}
          
          {/* Featured Products - Mobile Responsive */}
          <li className="py-2 border-t border-stone-200 mt-2">
            <button
              onClick={() => setFeaturedOpen(!featuredOpen)}
              className="
                w-full flex items-center justify-between
                px-3 py-2 rounded-lg
                text-stone-900 font-medium
                hover:bg-stone-200/50
                transition-all duration-200
              "
            >
              <span className="flex items-center gap-3">
                <span>Shop</span>
              </span>
              <ChevronDown
                size={16}
                className={`text-stone-600 transition-transform duration-200 ${
                  featuredOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            
            {featuredOpen && (
              <div className="mt-2 px-3 space-y-3 max-h-96 overflow-y-auto">
                {featuredCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      {category.title}
                    </h4>
                    <ul className="space-y-1 pl-2">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <Link
                            href={item.href}
                            className="block text-sm text-stone-600 hover:text-stone-800 hover:bg-stone-50 px-2 py-1.5 rounded transition-colors"
                            onClick={() => {
                              setOpen(false);
                              setFeaturedOpen(false);
                            }}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      )}
    </>
  );
}
