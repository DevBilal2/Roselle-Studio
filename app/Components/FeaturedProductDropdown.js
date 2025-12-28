"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const featuredCategories = [
  {
    title: "By Occasion",
    items: [
      { name: "Birthday Flowers", href: "/allproducts?category=birthday" },
      {
        name: "Anniversary Bouquets",
        href: "/allproducts?category=anniversary",
      },
      { name: "Wedding Flowers", href: "/allproducts?category=wedding" },
      { name: "Sympathy & Funeral", href: "/allproducts?category=sympathy" },
      {
        name: "Congratulations",
        href: "/allproducts?category=congratulations",
      },
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

export default function FeaturedProductsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);

    // Batch DOM reads to avoid forced reflow - use requestAnimationFrame
    if (triggerRef.current) {
      requestAnimationFrame(() => {
        if (triggerRef.current) {
          // Batch all DOM reads together
          const rect = triggerRef.current.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const scrollY = window.scrollY;
          const dropdownWidth = 800;

          // Calculate centered position
          const leftPosition = Math.max(
            20, // Minimum left margin
            Math.min(
              rect.left + rect.width / 2 - dropdownWidth / 2,
              viewportWidth - dropdownWidth - 20 // Maximum right position
            )
          );

          // Batch all DOM writes together
          requestAnimationFrame(() => {
            setDropdownPosition({
              left: leftPosition,
              top: rect.bottom + scrollY,
            });
            setIsOpen(true);
            setTimeout(() => setIsVisible(true), 10);
          });
        }
      });
    } else {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 10);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsOpen(false), 200);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    clearTimeout(timeoutRef.current);
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setIsOpen(false), 200);
    }, 150);
  };

  // Handle window resize - debounced to avoid forced reflows
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      // Debounce resize to avoid multiple reflows
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (isOpen && triggerRef.current) {
          // Batch DOM reads in requestAnimationFrame
          requestAnimationFrame(() => {
            if (triggerRef.current) {
              const rect = triggerRef.current.getBoundingClientRect();
              const viewportWidth = window.innerWidth;
              const scrollY = window.scrollY;
              const dropdownWidth = 800;

              const leftPosition = Math.max(
                20,
                Math.min(
                  rect.left + rect.width / 2 - dropdownWidth / 2,
                  viewportWidth - dropdownWidth - 20
                )
              );

              // Batch DOM writes
              requestAnimationFrame(() => {
                setDropdownPosition({
                  left: leftPosition,
                  top: rect.bottom + scrollY,
                });
              });
            }
          });
        }
      }, 150); // Debounce resize
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 200);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="relative" ref={triggerRef}>
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/allproducts"
            className="no-underline whitespace-nowrap text-stone-700 hover:text-stone-800 transition-all duration-300 flex items-center gap-1.5 group"
          >
            <span className="relative after:content-['']  after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-stone-600 after:transition-all after:duration-300 group-hover:after:w-full">
              Shop
            </span>
            <ChevronDown
              size={16}
              className={`text-stone-600 group-hover:text-stone-800 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Link>
        </div>
      </div>

      {isOpen && mounted && createPortal(
        <div
          ref={dropdownRef}
          className={`fixed top-0 bg-white border border-stone-200 rounded-2xl shadow-2xl w-[800px] z-[9999] overflow-hidden transition-all duration-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          style={{
            left: `${dropdownPosition.left}px`,
            top: `${dropdownPosition.top}px`,
            transformOrigin: "top center",
          }}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
          <div className="p-8">
            <div className="grid grid-cols-4 gap-6">
              {featuredCategories.map((category, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider border-b border-stone-100 pb-2">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          href={item.href}
                          className="block text-sm text-stone-600 hover:text-stone-800 hover:bg-stone-50 p-2 rounded transition-colors"
                          onClick={() => {
                            setIsVisible(false);
                            setTimeout(() => setIsOpen(false), 200);
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
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
