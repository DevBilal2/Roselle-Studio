export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-stone-800 to-stone-900 text-white py-16 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="h-6 w-32 bg-stone-700 rounded mb-6 animate-pulse"></div>
          <div className="h-12 w-64 bg-stone-700 rounded mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-stone-700 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:w-1/4">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-stone-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:w-3/4">
            <div className="h-12 bg-stone-200 rounded-lg mb-6 animate-pulse"></div>
            <div className="h-6 w-48 bg-stone-200 rounded mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-stone-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

