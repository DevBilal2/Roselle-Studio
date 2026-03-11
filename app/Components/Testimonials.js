import dynamic from "next/dynamic";

const testimonials = [
  {
    name: "Umer",
    title: "Customer",
    text: "Beautiful artificial arrangements from Rosélle Studio. They look so real and last forever. Exactly what I wanted for my home.",
    rating: 5,
    avatarColor: "bg-amber-100 text-amber-700",
    icon: "U",
  },
  {
    name: "Bilal",
    title: "Customer",
    text: "Great quality and fast delivery. The flowers are stunning and the packaging was careful. Will order again for sure.",
    rating: 5,
    avatarColor: "bg-stone-200 text-stone-700",
    icon: "B",
  },
  {
    name: "Ahmad",
    title: "Customer",
    text: "Rosélle Studio never disappoints. Ordered a few pieces for the office and everyone keeps asking where they're from. Highly recommend.",
    rating: 5,
    avatarColor: "bg-amber-100 text-amber-800",
    icon: "A",
  },
  {
    name: "Maniha",
    title: "Customer",
    text: "So happy with my purchase! The artificial flowers look elegant and are perfect for my living room. Thank you Rosélle Studio.",
    rating: 5,
    avatarColor: "bg-stone-100 text-stone-600",
    icon: "M",
  },
];

// Lazy load the slider component (client component)
// Intersection Observer handles lazy loading internally, no need for ssr: false
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
            Hear from creative minds who chose Roselle Studio
          </p>
        </div>

        <div className="relative px-12 md:px-16">
          {testimonials.length > 0 ? (
            <TestimonialsSlider testimonials={testimonials} />
          ) : (
            <p className="text-center text-stone-500 py-8">
              Customer reviews will appear here once they start coming in.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
