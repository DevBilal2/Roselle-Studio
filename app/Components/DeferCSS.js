"use client";

import { useEffect } from "react";

// Defer non-critical CSS loading to avoid render blocking
export default function DeferCSS() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Defer CSS loading until after page is interactive
    const loadDeferredCSS = () => {
      // Find all stylesheets that aren't loaded yet
      const links = document.querySelectorAll('link[rel="preload"][as="style"]');
      links.forEach((link) => {
        if (link.onload) {
          link.onload();
        } else {
          link.rel = "stylesheet";
        }
      });
    };

    // Wait for page to be interactive
    if (document.readyState === "complete") {
      // Use requestIdleCallback to defer CSS loading
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadDeferredCSS, { timeout: 2000 });
      } else {
        setTimeout(loadDeferredCSS, 100);
      }
    } else {
      window.addEventListener("load", () => {
        if ("requestIdleCallback" in window) {
          requestIdleCallback(loadDeferredCSS, { timeout: 2000 });
        } else {
          setTimeout(loadDeferredCSS, 100);
        }
      });
    }
  }, []);

  return null;
}

