// app/components/WhatsAppWidgetClient.js
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Lazy load the entire FloatingWhatsApp library to reduce initial bundle
const FloatingWhatsApp = dynamic(
  () => import("react-floating-whatsapp").then(mod => mod.default || mod.FloatingWhatsApp),
  { ssr: false }
);

export default function WhatsAppWidgetClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Defer widget loading aggressively to avoid blocking initial render on mobile
  useEffect(() => {
    // Use requestIdleCallback for mobile performance
    const loadWidget = () => {
      setMounted(true);
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        // Wait for browser to be idle, with 8 second timeout to reduce main-thread work
        requestIdleCallback(loadWidget, { timeout: 8000 });
      } else {
        // Fallback: defer with longer timeout for mobile
        setTimeout(loadWidget, 3000);
      }
    }
  }, []);

  // Don't render until mounted (prevents SSR issues and reduces initial JS)
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <FloatingWhatsApp
        phoneNumber="+923407989094"
        accountName="Bloomcraft Support"
        statusMessage="Typically replies within minutes"
        chatMessage="Hello! 👋 How can we help you today?"
        darkMode={false}
        notification={true}
        notificationSound={true}
        placeholder="Type your message here..."
        // Control opening/closing behavior
        allowClickAway={false} // Prevents closing when clicking outside
        allowEsc={true} // Still allows ESC key to close
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // Custom button click - only opens, doesn't close
        onClick={() => {
          if (!isOpen) {
            setIsOpen(true);
          }
        }}
        // Custom styles with Tailwind-in-JS
        buttonStyle={{
          backgroundColor: "#25D366",
          position: "fixed",
          left: "24px", // opposite of cart's right: 24px
          right: "auto",
          bottom: "24px",
        }}
        chatboxStyle={{
          borderRadius: "16px",
          left: "24px", // opposite of where cart would be
          right: "auto",
          bottom: "84px", // above the button
          position: "fixed",
        }}
      />
    </div>
  );
}
