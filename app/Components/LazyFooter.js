"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy load footer - only load when user scrolls near bottom
const Footer = dynamic(
  () => import("./Footer/Footer").then((mod) => ({ default: mod.Footer })),
  {
    ssr: false,
  }
);

export default function LazyFooter() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Load footer when user scrolls or after page is interactive
    const loadFooter = () => {
      if (typeof window !== "undefined") {
        if ("requestIdleCallback" in window) {
          requestIdleCallback(() => setShouldLoad(true), { timeout: 2000 });
        } else {
          setTimeout(() => setShouldLoad(true), 1500);
        }
      }
    };

    // Load on scroll (user is likely to see footer soon)
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShouldLoad(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    loadFooter(); // Also load after timeout

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!shouldLoad) {
    return <div className="min-h-[200px]" />; // Reserve space
  }

  return <Footer />;
}

