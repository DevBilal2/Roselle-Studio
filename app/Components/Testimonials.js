// app/components/Testimonials.jsx
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sophia Martinez",
    title: "Floral Boutique Owner",
    text: "BloomCraft transformed my online store completely! The floral aesthetic perfectly matches my brand, and customers love how easy it is to navigate. My sales increased by 40% in the first month!",
    rating: 5,
    avatarColor: "bg-gradient-to-r from-stone-300 to-amber-300",
    icon: "🌸",
  },
  {
    name: "James Wilson",
    title: "Wedding Planner",
    text: "As a wedding planner, aesthetics are everything. BloomCraft's elegant design makes showcasing my portfolio effortless. The responsive layout looks stunning on all devices.",
    rating: 5,
    avatarColor: "bg-gradient-to-r from-amber-300 to-stone-300",
    icon: "💐",
  },
  {
    name: "Aisha Chen",
    title: "Lifestyle Blogger",
    text: "The customization options are incredible! I created my dream floral blog in hours without touching code. The performance is lightning fast.",
    rating: 5,
    avatarColor: "bg-gradient-to-r from-stone-300 to-amber-300",
    icon: "🌺",
  },
  {
    name: "David Foster",
    title: "E-commerce Entrepreneur",
    text: "BloomCraft isn't just beautiful - it's functional. The conversion-focused design increased my add-to-cart rates significantly.",
    rating: 4,
    avatarColor: "bg-gradient-to-r from-stone-200 to-amber-200",
    icon: "🌷",
  },
  {
    name: "Emma Rodriguez",
    title: "Photographer",
    text: "Finally a theme that understands visual storytelling! My floral photography looks absolutely breathtaking on BloomCraft.",
    rating: 5,
    avatarColor: "bg-gradient-to-r from-amber-200 to-stone-200",
    icon: "🌼",
  },
];

export default function Testimonials() {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative py-16 md:py-20 px-5 lg:px-8 xl:px-[8%] bg-gradient-to-b from-stone-50/30 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-stone-700 to-stone-900 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-stone-600/70 max-w-2xl mx-auto">
            Hear from creative minds who chose BloomCraft
          </p>
        </div>

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
              // Store swiper instance
              swiperRef.current = swiper;
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div
            ref={prevRef}
            className="testimonial-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10"
          >
            <button
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-stone-300 text-stone-700 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <div
            ref={nextRef}
            className="testimonial-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10"
          >
            <button
              className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-stone-300 text-stone-700 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
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
    </section>
  );
}
// Testimonial Card Component - All cards will have equal height
function TestimonialCard({ testimonial }) {
  return (
    <div className="h-full min-h-[380px] bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-stone-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Quote Icon */}
      <div className="mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-stone-100 to-amber-100 flex items-center justify-center">
          <Quote className="text-amber-600" size={20} />
        </div>
      </div>

      {/* Content - Fixed height with flex grow */}
      <div className="flex-grow">
        <p className="text-stone-800 mb-6 leading-relaxed italic text-sm md:text-base line-clamp-5">
          "{testimonial.text}"
        </p>

        {/* Rating */}
        <div className="flex mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={`${
                i < testimonial.rating
                  ? "fill-amber-500 text-amber-500"
                  : "fill-amber-100 text-amber-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Author - Fixed at bottom */}
      <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
        <div
          className={`w-12 h-12 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-xl flex-shrink-0`}
        >
          {testimonial.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-stone-900 text-sm md:text-base truncate">
            {testimonial.name}
          </div>
          <div className="text-stone-600 text-xs md:text-sm truncate">
            {testimonial.title}
          </div>
        </div>
      </div>
    </div>
  );
}
  