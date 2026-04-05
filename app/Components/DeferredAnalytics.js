"use client";

import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function DeferredAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer analytics loading until after page load event
    if (typeof window !== "undefined") {
      const loadAnalytics = () => {
        setShouldLoad(true);
      };

      if (document.readyState === "complete") {
        // Page already loaded
        setTimeout(loadAnalytics, 100);
      } else {
        // Wait for load event
        window.addEventListener("load", loadAnalytics, { once: true });
      }
    }
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return <SpeedInsights />;
}

