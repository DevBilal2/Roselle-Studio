"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Phone,
} from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/1banner.jpeg",
    buttonText: "Shop",
    buttonLink: "/allproducts",
    isB2B: false,
  },
  {
    id: 2,
    image: "/2ndbanner.jpeg",
    buttonText: "Shop",
    buttonLink: "/allproducts",
    isB2B: false,
  },
  {
    id: 3,
    image: "/3rdbanner.jpeg",
    buttonText: "Shop",
    buttonLink: "/allproducts",
    isB2B: false,
  },
  {
    id: 4,
    image: "/b2b.jpeg",
    buttonText: "Contact Us",
    buttonLink: "/contact",
    isB2B: true,
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
    <div className="relative w-full max-w-7xl mx-auto">
      {/* SLIDER CONTAINER */}
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl w-full">
        {/* SLIDER TRACK */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative w-full min-w-full flex-shrink-0 h-[45vh] min-h-[220px] sm:h-[55vh] md:h-[65vh] lg:h-[75vh]"
            >
              {/* Banner Image - responsive sizes for correct srcset & performance */}
              <Image
                src={slide.image}
                alt={`Banner ${slide.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                priority={slide.id === 1}
                quality={70}
              />

              {/* Action Button - responsive position & size */}
              <div className="absolute left-1/2 bottom-[18%] sm:bottom-[22%] md:left-[25%] md:bottom-[25%] -translate-x-1/2 translate-y-1/2 z-10 w-[90%] max-w-[280px] sm:max-w-none sm:w-auto md:max-w-none md:w-auto">
                <Link
                  href={slide.buttonLink}
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-stone-800/95 backdrop-blur-sm text-white rounded-full hover:bg-stone-900 transition-all duration-300 shadow-2xl hover:shadow-3xl font-semibold text-sm sm:text-base md:text-lg border-2 border-white/20 hover:scale-105 active:scale-95 md:hover:scale-110 touch-manipulation"
                  aria-label={slide.isB2B ? "Contact us for business inquiries" : "Shop all products"}
                >
                  {slide.isB2B ? (
                    <Phone className="shrink-0" size={18} aria-hidden="true" />
                  ) : (
                    <ShoppingBag className="shrink-0" size={18} aria-hidden="true" />
                  )}
                  <span>{slide.buttonText}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - responsive size & spacing */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 sm:p-3 rounded-full shadow-xl hover:scale-110 transition border border-stone-200 z-20 touch-manipulation sm:left-4"
        >
          <ChevronLeft className="text-stone-900 w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </button>

        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2.5 sm:p-3 rounded-full shadow-xl hover:scale-110 transition border border-stone-200 z-20 touch-manipulation sm:right-4"
        >
          <ChevronRight className="text-stone-900 w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </button>
      </div>

      {/* DOTS INDICATORS - responsive touch targets */}
      <div className="mt-4 sm:mt-6 flex justify-center gap-2 sm:gap-3" role="tablist" aria-label="Slide indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === current}
            role="tab"
            className={`h-2.5 sm:h-3 rounded-full transition-all touch-manipulation min-w-[10px] ${
              i === current ? "w-8 sm:w-10 bg-stone-900" : "w-2.5 sm:w-3 bg-stone-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

