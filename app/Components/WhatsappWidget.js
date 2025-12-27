// app/components/WhatsAppWidgetClient.js
"use client";

import { FloatingWhatsApp } from "@dxkit-org/react-floating-whatsapp";
import { useState } from "react";

export default function WhatsAppWidgetClient() {
  const [isOpen, setIsOpen] = useState(false);

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
