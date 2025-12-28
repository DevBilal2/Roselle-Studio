// components/PaginationClient.jsx (FIXED - NO RELOADS & RESPONSIVE)
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function PaginationClient({
  currentPage,
  totalPages,
  totalProducts,
  limit,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track window width for responsive pagination
  const [maxVisible, setMaxVisible] = useState(5); // Default to 5 for SSR

  useEffect(() => {
    let resizeTimeout;
    // Set initial value - debounced to avoid forced reflows
    const updateMaxVisible = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          setMaxVisible(window.innerWidth < 640 ? 3 : 5);
        });
      }, 150);
    };
    
    // Initial value
    if (typeof window !== "undefined") {
      updateMaxVisible();
      window.addEventListener("resize", updateMaxVisible, { passive: true });
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", updateMaxVisible);
        clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Handle page change WITHOUT reload
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the beginning
      if (currentPage <= 2) {
        start = 2;
        end = Math.min(totalPages - 1, maxVisible - 1);
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - maxVisible + 2);
        end = totalPages - 1;
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("ellipsis-left");
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("ellipsis-right");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  // For mobile, show simplified version
  const MobilePagination = () => (
    <div className="flex items-center justify-between w-full sm:hidden">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors border ${
          currentPage <= 1
            ? "text-stone-400 cursor-not-allowed border-stone-200"
            : "text-stone-700 hover:bg-stone-50 border-stone-300 hover:border-stone-400"
        }`}
      >
        <ChevronLeft size={18} />
        <span className="text-sm font-medium">Prev</span>
      </button>
      
      <div className="px-4 py-2 text-sm font-medium text-stone-700">
        Page {currentPage} of {totalPages}
      </div>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`flex-1 px-4 py-2 rounded-lg flex items-center justify-center gap-1 transition-colors border ${
          currentPage >= totalPages
            ? "text-stone-400 cursor-not-allowed border-stone-200"
            : "text-stone-700 hover:bg-stone-50 border-stone-300 hover:border-stone-400"
        }`}
      >
        <span className="text-sm font-medium">Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );

  // For desktop/tablet, show full pagination
  const DesktopPagination = () => {
    const pages = getPageNumbers();
    
    return (
      <>
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
          <span className="hidden sm:inline">Previous</span>
          <span className="inline sm:hidden">Prev</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 sm:gap-2">
          {pages.map((page, index) => {
            if (page === "ellipsis-left" || page === "ellipsis-right") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-stone-400"
                >
                  <MoreHorizontal size={16} />
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors border text-sm sm:text-base ${
                  currentPage === page
                    ? "bg-stone-800 text-white border-stone-900 shadow-sm"
                    : "text-stone-700 hover:bg-stone-50 border-stone-300 hover:border-stone-400"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

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
          <span className="hidden sm:inline">Next</span>
          <span className="inline sm:hidden">Next</span>
          <ChevronRight size={16} />
        </button>
      </>
    );
  };

  return (
    <div className="mt-8 sm:mt-12">
      {/* Results Count - Responsive */}
      <div className="mb-4 text-center text-stone-600 text-sm sm:text-base">
        <span className="hidden sm:inline">
          Showing {Math.min((currentPage - 1) * limit + 1, totalProducts)}-
          {Math.min(currentPage * limit, totalProducts)} of {totalProducts}{" "}
          products
        </span>
        <span className="inline sm:hidden">
          {Math.min((currentPage - 1) * limit + 1, totalProducts)}-
          {Math.min(currentPage * limit, totalProducts)} of {totalProducts}
        </span>
      </div>

      {/* Mobile Pagination */}
      <div className="sm:hidden">
        <MobilePagination />
      </div>

      {/* Desktop/Tablet Pagination */}
      <div className="hidden sm:block">
        <div className="flex justify-center">
          <div className="flex items-center gap-1 sm:gap-2">
            <DesktopPagination />
          </div>
        </div>

        {/* Quick Jump Buttons - Desktop Only */}
        {totalPages > 7 && (
          <div className="mt-6 flex justify-center gap-3">
            {currentPage > 3 && (
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-1 text-sm text-stone-700 hover:text-stone-800 hover:bg-stone-50 rounded-lg transition-colors border border-stone-200 hover:border-stone-300"
              >
                First
              </button>
            )}

            {currentPage < totalPages - 2 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-1 text-sm text-stone-700 hover:text-stone-800 hover:bg-stone-50 rounded-lg transition-colors border border-stone-200 hover:border-stone-300"
              >
                Last ({totalPages})
              </button>
            )}
          </div>
        )}
      </div>

      {/* Page Size Selector - Mobile Only */}
      <div className="mt-6 sm:hidden">
        <div className="flex items-center justify-center gap-2 text-sm text-stone-600">
          <span>Page:</span>
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="px-3 py-1 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-stone-400"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          <span>of {totalPages}</span>
        </div>
      </div>
    </div>
  );
}