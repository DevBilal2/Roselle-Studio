import dynamic from "next/dynamic";

/**
 * REVERT to boxed banner (if you want the old layout back):
 * - Section: className="bg-stone-100 py-4 overflow-hidden"
 * - Wrap slider: <div className="container mx-auto px-4"><HomeSlider /></div>
 * - HomeSlider.js: see REVERT block at top of return for classes to restore.
 */
const HomeSlider = dynamic(() => import("./HomeSlider"), {
  loading: () => (
    <div
      className="w-full min-h-[max(14rem,calc(100dvh-5rem))] animate-pulse bg-stone-200"
      aria-hidden="true"
    />
  ),
});

export default function HomeSection() {
  return (
    <section className="relative w-full overflow-x-clip bg-stone-100">
      <HomeSlider />
    </section>
  );
}
