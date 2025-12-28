// Global loading fallback for faster initial response
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="h-12 bg-stone-200 rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-stone-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

