"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

// Client-only components that don't need SSR
// These are wrapped in a client component to avoid Server Component errors
const CartSidebar = dynamic(() => import("./Cart/Cart"), {
  ssr: false,
});

const CartIcon = dynamic(() => import("./CartIcon/CartIcon"), {
  ssr: false,
});

const WhatsAppWidgetClient = dynamic(
  () => import("./WhatsappWidget"),
  {
    ssr: false,
  }
);

export default function ClientOnlyComponents() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
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

