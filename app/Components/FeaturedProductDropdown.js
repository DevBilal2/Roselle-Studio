"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const COLUMN_COUNT = 4;

function chunkIntoColumns(items, columns = COLUMN_COUNT) {
  const result = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => result[i % columns].push(item));
  return result;
}

export default function FeaturedProductsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 });
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/collections")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setCollections(Array.isArray(data) ? data : []))
      .catch(() => setCollections([]))
      .finally(() => setLoading(false));
  }, []);

  const collectionColumns = chunkIntoColumns(
    collections.map((c) => ({ name: c.title, href: `/collections/${c.handle}` })),
    COLUMN_COUNT
  );

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);

    if (triggerRef.current) {
      requestAnimationFrame(() => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const dropdownWidth = 800;
          // Fixed position = viewport-relative; do NOT add scrollY
          const leftPosition = Math.max(
            20,
            Math.min(
              rect.left + rect.width / 2 - dropdownWidth / 2,
              viewportWidth - dropdownWidth - 20
            )
          );

          requestAnimationFrame(() => {
            setDropdownPosition({
              left: leftPosition,
              top: rect.bottom + 4,
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

  // Handle window resize - keep dropdown under trigger (viewport-relative for fixed)
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (isOpen && triggerRef.current) {
          requestAnimationFrame(() => {
            if (triggerRef.current) {
              const rect = triggerRef.current.getBoundingClientRect();
              const viewportWidth = window.innerWidth;
              const dropdownWidth = 800;
              const leftPosition = Math.max(
                20,
                Math.min(
                  rect.left + rect.width / 2 - dropdownWidth / 2,
                  viewportWidth - dropdownWidth - 20
                )
              );
              requestAnimationFrame(() => {
                setDropdownPosition({
                  left: leftPosition,
                  top: rect.bottom + 4,
                });
              });
            }
          });
        }
      }, 150);
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

  // Prevent body scroll when dropdown is open so hover doesn't move the page
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

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
className="no-underline whitespace-nowrap text-green-800 hover:text-green-700 transition-all duration-300 flex items-center gap-1.5 group"
            >
              <span className="relative after:content-['']  after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 group-hover:after:w-full">
              Shop
            </span>
            <ChevronDown
              size={16}
              className={`text-green-700 group-hover:text-green-600 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Link>
        </div>
      </div>

      {isOpen && mounted && createPortal(
        <div
          ref={dropdownRef}
          className={`fixed top-0 bg-white border border-stone-200 rounded-2xl shadow-2xl w-[800px] max-h-[calc(100vh-8rem)] z-[9999] overflow-y-auto overflow-x-hidden transition-all duration-200 ${
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
            {loading ? (
              <div className="py-8 text-center text-stone-500 text-sm">
                Loading collections…
              </div>
            ) : collections.length === 0 ? (
              <div className="py-8 text-center text-stone-500 text-sm">
                No collections yet.
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-6">
                {collectionColumns.map((column, colIndex) => (
                  <div key={colIndex} className="space-y-2">
                    {column.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className="block text-sm text-green-800 hover:text-green-700 hover:bg-green-50/80 p-2 rounded transition-colors"
                        onClick={() => {
                          setIsVisible(false);
                          setTimeout(() => setIsOpen(false), 200);
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
