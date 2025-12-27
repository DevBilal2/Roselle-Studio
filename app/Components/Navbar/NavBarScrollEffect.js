"use client";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

export default function NavBarScrollEffect() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  console.log(scrolled);
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
