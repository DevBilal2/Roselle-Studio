export default function CompaniesSectionSkeleton() {
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

