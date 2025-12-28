import dynamic from "next/dynamic";
import { Suspense } from "react";
import HomeSection from "./Components/HomeSection/HomeSection";
// import Contact from "./contact/Contact";
import NavBarScrollEffect from "./Components/Navbar/NavBarScrollEffect";
// import CategoryNav from "./Components/CatogaryNav";

// Loading skeleton for CompaniesSection
function CompaniesSectionSkeleton() {
  return (
    <div className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="h-12 bg-stone-200 rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-stone-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 bg-stone-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lazy load below-the-fold components for mobile (still lazy-loaded, just without ssr: false)
const CompaniesSection = dynamic(
  () => import("./Components/CompaniesSection/CompaniesSection"),
  { loading: () => <CompaniesSectionSkeleton /> }
);

// Services loading skeleton
function ServicesSkeleton() {
  return (
    <div className="py-20 bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4">
        <div className="h-12 bg-stone-200 rounded-lg w-64 mx-auto mb-12 animate-pulse"></div>
      </div>
    </div>
  );
}

// Split Services component - defer loading for mobile
const Services = dynamic(() => import("./Components/ServiceSection/Services"), {
  loading: () => <ServicesSkeleton />,
});

// Defer below-fold sections for mobile
const AboutSection = dynamic(() => import("./Components/About/About"), {
  loading: () => (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="h-12 bg-stone-200 rounded-lg w-64 mx-auto mb-12 animate-pulse"></div>
      </div>
    </div>
  ),
});

const CompactBlogSection = dynamic(
  () => import("./Components/compactblogsection"),
  {
    loading: () => (
      <div className="py-12 px-5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 bg-stone-200 rounded-lg w-48 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-stone-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    ),
  }
);

const Testimonials = dynamic(() => import("./Components/Testimonials"), {
  loading: () => (
    <div className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="container mx-auto px-4">
        <div className="h-12 bg-stone-200 rounded-lg w-64 mx-auto mb-12 animate-pulse"></div>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      {/* <NavBarScrollEffect /> */}
      {/* <CategoryNav /> */}
      <main>
        <HomeSection />
        {/* Use Suspense to prevent blocking - page renders immediately */}
        <Suspense fallback={<CompaniesSectionSkeleton />}>
          <CompaniesSection />
        </Suspense>
        <Services />
        <AboutSection />
        <CompactBlogSection />
        {/* <Contact /> */}
        <Testimonials />
      </main>
      {/* <Footer /> */}
    </>
  );
}
