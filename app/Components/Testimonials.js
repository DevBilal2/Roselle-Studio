import dynamic from "next/dynamic";

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

// Lazy load the slider component (client component)
const TestimonialsSlider = dynamic(() => import("./Testimonials/TestimonialsSlider"), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-[380px] bg-white/90 rounded-2xl p-6 border border-stone-200 animate-pulse">
          <div className="h-12 w-12 rounded-full bg-stone-200 mb-4"></div>
          <div className="h-4 bg-stone-200 rounded mb-2"></div>
          <div className="h-4 bg-stone-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  ),
});

export default function Testimonials() {
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

        <div className="relative px-12 md:px-16">
          <TestimonialsSlider testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
