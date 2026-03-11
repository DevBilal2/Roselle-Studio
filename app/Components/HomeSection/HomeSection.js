import dynamic from "next/dynamic";

// Lazy load the slider component (client component)
const HomeSlider = dynamic(() => import("./HomeSlider"), {
  loading: () => (
    <div className="relative max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-r from-stone-50 via-stone-100 to-amber-50">
        <div className="p-8 md:p-14 flex flex-col md:flex-row items-center min-h-[400px]">
          <div className="flex-1">
            <div className="h-8 bg-stone-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="h-6 bg-stone-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-12 bg-stone-200 rounded w-64 mb-4 animate-pulse"></div>
            <div className="h-4 bg-stone-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-stone-200 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function HomeSection() {
  return (
    <section className="bg-stone-100 py-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <HomeSlider />
      </div>
    </section>
  );
}
