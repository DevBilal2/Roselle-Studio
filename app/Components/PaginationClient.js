// components/PaginationClient.jsx (FIXED - NO RELOADS)
"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationClient({
  currentPage,
  totalPages,
  totalProducts,
  limit,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle page change WITHOUT reload
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-12">
      <div className="mb-4 text-center text-stone-600">
        Showing {Math.min((currentPage - 1) * limit + 1, totalProducts)}-
        {Math.min(currentPage * limit, totalProducts)} of {totalProducts}{" "}
        products
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-colors border ${
              currentPage <= 1
                ? "text-stone-400 cursor-not-allowed border-stone-200"
                : "text-stone-700 hover:bg-stone-50 border-stone-300 hover:border-stone-400"
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors border ${
                  currentPage === pageNum
                    ? "bg-stone-800 text-white border-stone-900 shadow-sm"
                    : "text-stone-700 hover:bg-stone-50 border-stone-300 hover:border-stone-400"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`px-4 py-2 rounded-lg flex items-center gap-1 transition-colors border ${
              currentPage >= totalPages
                ? "text-stone-400 cursor-not-allowed border-stone-200"
                : "text-stone-700 hover:bg-stone-50 border-stone-300 hover:border-stone-400"
            }`}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Quick Jump Buttons */}
      <div className="mt-6 flex justify-center gap-3">
        {currentPage > 3 && totalPages > 5 && (
          <button
            onClick={() => handlePageChange(1)}
            className="px-3 py-1 text-sm text-stone-700 hover:text-stone-800 hover:bg-stone-50 rounded-lg transition-colors border border-stone-200 hover:border-stone-300"
          >
            First
          </button>
        )}

        {currentPage < totalPages - 2 && totalPages > 5 && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-3 py-1 text-sm text-stone-700 hover:text-stone-800 hover:bg-stone-50 rounded-lg transition-colors border border-stone-200 hover:border-stone-300"
          >
            Last ({totalPages})
          </button>
        )}
      </div>
    </div>
  );
}
