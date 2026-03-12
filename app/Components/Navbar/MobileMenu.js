"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function MobileMenu({ navLinks }) {
  const [open, setOpen] = useState(false);
  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!featuredOpen) return;
    setLoading(true);
    fetch("/api/collections")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCollections(Array.isArray(data) ? data : []))
      .catch(() => setCollections([]))
      .finally(() => setLoading(false));
  }, [featuredOpen]);

  return (
    <>
      {/* MENU BUTTON */}
      <button
        className="p-2 text-green-800"
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
                  text-green-800 font-medium
                  hover:bg-green-50
                  transition-all duration-200
                "
                onClick={() => setOpen(false)}
              >
                {link.icon && (
                  <link.icon size={16} className="text-green-700" />
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
                text-green-800 font-medium
                hover:bg-green-50
                transition-all duration-200
              "
            >
              <span className="flex items-center gap-3">
                <span>Shop</span>
              </span>
              <ChevronDown
                size={16}
                className={`text-green-700 transition-transform duration-200 ${
                  featuredOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            
            {featuredOpen && (
              <div className="mt-2 px-3 space-y-2 max-h-96 overflow-y-auto">
                {loading ? (
                  <p className="text-sm text-stone-500 py-2">Loading…</p>
                ) : collections.length === 0 ? (
                  <p className="text-sm text-stone-500 py-2">No collections yet.</p>
                ) : (
                  <ul className="space-y-1 pl-2">
                    {collections.map((c) => (
                      <li key={c.id || c.handle}>
                        <Link
                          href={`/collections/${c.handle}`}
                          className="block text-sm text-green-800 hover:text-green-700 hover:bg-green-50 px-2 py-1.5 rounded transition-colors"
                          onClick={() => {
                            setOpen(false);
                            setFeaturedOpen(false);
                          }}
                        >
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        </ul>
      )}
    </>
  );
}
