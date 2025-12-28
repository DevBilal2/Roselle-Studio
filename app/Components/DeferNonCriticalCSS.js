"use client";

import { useEffect } from "react";

/**
 * Optimize CSS loading to reduce render-blocking
 * Uses the print media trick to defer non-critical CSS
 */
export default function DeferNonCriticalCSS() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const optimizeCSS = () => {
      // Find all render-blocking stylesheets
      const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]:not([media])'));
      
      links.forEach((link) => {
        const href = link.getAttribute("href");
        
        // Skip if already processed or is critical
        if (!href || link.getAttribute("data-optimized")) return;
        
        // Only optimize non-critical CSS files
        // Keep fonts and critical CSS as-is
        if (href.includes("/_next/static/css/") && !href.includes("fonts")) {
          // Mark as optimized
          link.setAttribute("data-optimized", "true");
          
          // Use print media trick to defer loading
          link.media = "print";
          link.onload = function() {
            this.media = "all";
            this.onload = null;
          };
          
          // Fallback for browsers that don't fire onload
          if (link.sheet === null) {
            setTimeout(() => {
              link.media = "all";
            }, 0);
          }
        }
      });
    };

    // Run after DOM is ready but before full page load
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", optimizeCSS);
    } else {
      // Already loaded, run immediately
      optimizeCSS();
    }
  }, []);

  return null;
}

