"use client";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

export default function NavBarScrollEffect() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Defer scroll listener initialization to avoid blocking initial render
    const handleScroll = () => setScrolled(window.scrollY > 40);
    
    // Use requestIdleCallback to defer scroll listener setup
    const setupScrollListener = () => {
      handleScroll(); // Set initial state
      window.addEventListener("scroll", handleScroll, { passive: true });
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        const idleId = requestIdleCallback(setupScrollListener, { timeout: 1000 });
        return () => {
          cancelIdleCallback(idleId);
          window.removeEventListener("scroll", handleScroll);
        };
      } else {
        // Fallback: defer with setTimeout
        const timer = setTimeout(setupScrollListener, 100);
        return () => {
          clearTimeout(timer);
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, []);
  return (
    <NavBar
      className={
        scrolled
          ? " bg-opacity-50 backdrop-blur-lg shadow-sm bg-opacity-50 bg-transparent shadow-white/20"
          : ""
      }
      ulClassName={scrolled ? "" : "bg-black shadow-sm bg-opacity-50 "}
    />
  );
}
