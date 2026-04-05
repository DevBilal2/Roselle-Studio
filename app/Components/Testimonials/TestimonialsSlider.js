"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSlider({ testimonials }) {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Load Swiper CSS via CDN to avoid render blocking (performance optimization)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const existingLink = document.querySelector('link[href*="swiper"]');
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
      }
    }
  }, []);

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        navigation={{
          prevEl: ".testimonial-prev",
          nextEl: ".testimonial-next",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          el: ".custom-pagination",
        }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation — centered on swiper edge so most of the control sits in section padding, not on cards */}
      <div
        ref={prevRef}
        className="testimonial-prev absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:-translate-x-[55%] lg:-translate-x-[60%]"
      >
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white/90 text-stone-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} aria-hidden />
        </button>
      </div>

      <div
        ref={nextRef}
        className="testimonial-next absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 md:translate-x-[55%] lg:translate-x-[60%]"
      >
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white/90 text-stone-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-xl"
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} aria-hidden />
        </button>
      </div>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination flex justify-center gap-2 mt-10">
        <style jsx global>{`
          .custom-pagination .swiper-pagination-bullet {
            background-color: #d6d3d1;
            opacity: 1;
            width: 10px;
            height: 10px;
            transition: all 0.3s ease;
          }
          .custom-pagination .swiper-pagination-bullet-active {
            background: linear-gradient(to right, #57534e, #92400e);
            width: 30px;
            border-radius: 5px;
          }
        `}</style>
      </div>
    </div>
  );
}
