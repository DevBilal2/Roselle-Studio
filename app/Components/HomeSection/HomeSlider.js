"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "TIMELESS ELEGANCE",
    heading: "Eternal Blooms Collection",
    description:
      "Discover our premium artificial flowers that bring everlasting beauty without the maintenance.",
    buttonText: "Shop Now",
    icon: "ShoppingBag",
    accentColor: "bg-gradient-to-r from-stone-700 to-stone-800",
    bannerStyle: "bg-gradient-to-r from-stone-50 via-stone-100 to-amber-50",
    badge: "BEST SELLER",
    badgeColor: "bg-stone-800 text-white",
    imageBg: "bg-gradient-to-br from-amber-100/30 to-stone-100/40",
    buttonLink: "/allproducts",
  },
  {
    id: 2,
    title: "NEW ARRIVALS",
    heading: "Seasonal Wonders",
    description:
      "Fresh designs inspired by nature's finest seasons. Limited edition pieces available.",
    buttonText: "Explore New",
    icon: "Sparkles",
    accentColor: "bg-gradient-to-r from-amber-700 to-amber-800",
    bannerStyle: "bg-gradient-to-r from-amber-50 via-stone-100 to-stone-50",
    badge: "LIMITED EDITION",
    badgeColor: "bg-amber-700 text-white",
    imageBg: "bg-gradient-to-br from-stone-100/30 to-amber-100/40",
    buttonLink: "/allproducts",
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    // Defer slider initialization aggressively to avoid blocking initial render
    let intervalId;
    
    const startSlider = () => {
      intervalId = setInterval(next, 6000);
    };

    // Use requestIdleCallback to defer slider start until browser is idle
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleTimer = requestIdleCallback(startSlider, { timeout: 5000 });
      return () => {
        cancelIdleCallback(idleTimer);
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    } else {
      // Fallback: start after 3 seconds
      const timer = setTimeout(startSlider, 3000);
      return () => {
        clearTimeout(timer);
        if (intervalId) {
          clearInterval(intervalId);
        }
      };
    }
  }, [next]);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* SLIDER CONTAINER - Fixed width and overflow hidden */}
      <div className="relative overflow-hidden rounded-3xl shadow-xl">
        {/* SLIDER TRACK */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => {
            return (
              <div
                key={slide.id}
                className={`min-w-full ${slide.bannerStyle}`}
              >
                <div className="p-8 md:p-14 flex flex-col md:flex-row items-center">
                  {/* TEXT */}
                  <div className="flex-1 md:pr-8">
                    <span
                      className={`${slide.badgeColor} px-4 py-2 rounded-full text-sm font-semibold`}
                    >
                      {slide.badge}
                    </span>

                    <p className="mt-6 text-sm tracking-widest uppercase text-stone-900 font-semibold">
                      {slide.title}
                    </p>

                    <h1 className="mt-2 text-4xl md:text-5xl font-serif font-bold text-stone-900">
                      {slide.heading}
                    </h1>

                    <p className="mt-4 text-lg text-stone-800 max-w-xl">
                      {slide.description}
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <Link
                        href={slide.buttonLink || "/allproducts"}
                        aria-label={`${slide.buttonText} - ${slide.heading}`}
                        className={`flex items-center justify-center gap-3 px-6 py-4 ${slide.accentColor} text-white rounded-lg shadow-lg hover:scale-105 transition`}
                      >
                        {slide.buttonText}
                        <ArrowRight size={20} aria-hidden="true" />
                      </Link>

                      <Link 
                        href="/allproducts"
                        aria-label="Learn more about our collections"
                        className="px-6 py-4 bg-white/90 border-2 border-stone-300 text-stone-900 rounded-lg hover:bg-white transition shadow-lg text-center"
                      >
                        Learn More
                      </Link>
                    </div>

                    <div className="mt-8 flex gap-4 flex-wrap">
                      {[
                        "Free Shipping",
                        "Premium Quality",
                        "30-Day Returns",
                      ].map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full"
                        >
                          <Star size={14} className="text-amber-700" />
                          <span className="text-sm text-stone-900">
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* VISUAL */}
                  <div className="flex-1 mt-10 md:mt-0 flex justify-center">
                    <div
                      className={`${slide.imageBg} rounded-2xl p-12 flex items-center justify-center`}
                    >
                      <div className="relative">
                        <span className="text-8xl opacity-30">🌸</span>
                        <span className="absolute -top-4 -right-4 text-5xl opacity-40">
                          🌺
                        </span>
                        <span className="absolute -bottom-4 -left-4 text-5xl opacity-40">
                          🌿
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CONTROLS */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:scale-110 transition border border-stone-200 z-10"
        >
          <ChevronLeft className="text-stone-900" size={24} aria-hidden="true" />
        </button>

        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-xl hover:scale-110 transition border border-stone-200 z-10"
        >
          <ChevronRight className="text-stone-900" size={24} aria-hidden="true" />
        </button>
      </div>

      {/* DOTS */}
      <div className="mt-8 flex justify-center gap-3" role="tablist" aria-label="Slide indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === current}
            role="tab"
            className={`h-3 rounded-full transition-all ${
              i === current ? "w-10 bg-stone-900" : "w-3 bg-stone-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

