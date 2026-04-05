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

  /* REVERT (boxed hero): outer wrapper
       className="mx-auto w-full max-w-7xl px-2 sm:px-4 md:px-6"
     inner card: rounded-2xl shadow-xl md:rounded-3xl (not rounded-none)
     slide heights: h-[45vh] min-h-[220px] sm:h-[55vh] md:h-[65vh] lg:h-[75vh]
     arrows: left-0 -translate-x-1/2 … md:-translate-x-[55%] (see git history) */
  return (
    <div className="w-full max-w-none">
      <div className="relative">
        <div className="relative w-full overflow-hidden rounded-none shadow-none">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="relative h-[max(14rem,calc(100dvh-5rem))] min-h-[14rem] w-full min-w-full shrink-0"
              >
                <Image
                  src={slide.image}
                  alt={`Banner ${slide.id}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={slide.id === 1}
                  quality={70}
                />

                <div className="absolute bottom-[18%] left-1/2 z-10 w-[90%] max-w-[280px] -translate-x-1/2 translate-y-1/2 sm:bottom-[22%] sm:max-w-none sm:w-auto md:bottom-[25%] md:left-[25%] md:w-auto md:max-w-none">
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
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-stone-200 bg-white/95 p-2.5 shadow-xl backdrop-blur-sm transition hover:scale-110 touch-manipulation sm:left-4 sm:p-3"
        >
          <ChevronLeft className="h-5 w-5 text-stone-900 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-stone-200 bg-white/95 p-2.5 shadow-xl backdrop-blur-sm transition hover:scale-110 touch-manipulation sm:right-4 sm:p-3"
        >
          <ChevronRight className="h-5 w-5 text-stone-900 sm:h-6 sm:w-6" aria-hidden="true" />
        </button>
      </div>

      <div
        className="mt-3 flex justify-center gap-2 px-4 pb-4 sm:mt-4 sm:gap-3"
        role="tablist"
        aria-label="Slide indicators"
      >
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


