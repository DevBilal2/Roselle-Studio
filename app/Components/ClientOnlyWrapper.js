"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

// Import client-only components with ssr: false
// Defer loading until after page is interactive for mobile performance
const CartSidebar = dynamic(() => import("./Cart/Cart"), {
  ssr: false,
});

const CartIcon = dynamic(() => import("./CartIcon/CartIcon"), {
  ssr: false,
});

// Defer WhatsApp widget more aggressively - load last
const WhatsAppWidgetClient = dynamic(
  () => import("./WhatsappWidget"),
  {
    ssr: false,
  }
);

export default function ClientOnlyWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer all client-only components until after page is interactive
    // Use longer timeout to reduce main-thread work
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        // Increase timeout to 5s to defer more aggressively
        requestIdleCallback(() => setShouldLoad(true), { timeout: 5000 });
      } else {
        // Fallback: wait for page to be interactive
        if (document.readyState === "complete") {
          setTimeout(() => setShouldLoad(true), 2000);
        } else {
          window.addEventListener("load", () => {
            setTimeout(() => setShouldLoad(true), 2000);
          });
        }
      }
    }
  }, []);

  if (!shouldLoad) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <CartSidebar />
      <CartIcon />
      <WhatsAppWidgetClient />
    </Suspense>
  );
}

