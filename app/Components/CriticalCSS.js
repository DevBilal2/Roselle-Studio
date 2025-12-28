"use client";

import { useEffect } from "react";

export default function CriticalCSS() {
  useEffect(() => {
    // Defer non-critical CSS loading
    if (typeof window !== "undefined") {
      // Load CSS asynchronously after page is interactive
      const loadCSS = () => {
        // This will be handled by Next.js automatically
        // But we can ensure it doesn't block
      };

      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadCSS, { timeout: 2000 });
      } else {
        setTimeout(loadCSS, 100);
      }
    }
  }, []);

  return null;
}

