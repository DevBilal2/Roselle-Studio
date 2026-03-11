import { CartProvider } from "./context/CartContext";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Use ClientOnlyWrapper for client-only components (handles ssr: false internally)
const ClientOnlyWrapper = dynamic(
  () => import("./Components/ClientOnlyWrapper"),
  {
    loading: () => null,
  }
);

// Navbar can be server-rendered (above fold)
const NavBarScrollEffect = dynamic(
  () => import("./Components/Navbar/NavBarScrollEffect")
);

// Footer is below fold - lazy load for mobile
const Footer = dynamic(
  () => import("./Components/Footer/Footer").then((mod) => ({ default: mod.Footer })),
  {
    loading: () => <div className="min-h-[200px]" />,
  }
);


// Optimize font loading for better LCP
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Defer font preload to improve initial load
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.roselle.com.pk";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Roselle Studio | Artificial Flowers, Bouquets & Decor in Lahore, Pakistan",
    template: "%s | Roselle Studio Lahore",
  },
  description:
    "Lahore's leading artificial flower brand. Shop bouquets, bunches, flower arrangements, decoration pieces, balloons & more. Wholesale artificial flowers in Pakistan. Free delivery in Lahore.",
  keywords: [
    "artificial flowers Lahore",
    "artificial flowers Pakistan",
    "fake flowers Lahore",
    "flower bouquets Pakistan",
    "artificial flower bouquets",
    "flower decoration Lahore",
    "wholesale artificial flowers Pakistan",
    "flower bunches",
    "balloon decoration Lahore",
    "home decoration flowers",
    "Roselle Studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "Roselle Studio",
    title: "Roselle Studio | Artificial Flowers & Decor in Lahore, Pakistan",
    description:
      "Shop artificial bouquets, bunches, decoration pieces & balloons. Wholesale flowers in Lahore & Pakistan.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "Roselle Studio - Artificial Flowers Lahore" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roselle Studio | Artificial Flowers Lahore, Pakistan",
    description: "Bouquets, bunches, decor & wholesale artificial flowers in Lahore.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <html lang="en">
        <head>
          {/* Resource hints - removed unused preconnect for cdn.shopify.com */}
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          {/* Critical CSS inline for above-the-fold content - defer non-critical */}
          <style dangerouslySetInnerHTML={{
            __html: `
              /* Critical above-the-fold styles */
              body{margin:0;font-family:var(--font-geist-sans),system-ui,-apple-system,sans-serif}
              .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
              .scrollbar-hide::-webkit-scrollbar{display:none}
            `
          }} />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <NavBarScrollEffect />
          {children}
          {/* Client-only components loaded after page is interactive */}
          <ClientOnlyWrapper />
          <Footer />
          <SpeedInsights />
        </body>
      </html>
    </CartProvider>
  );
}
