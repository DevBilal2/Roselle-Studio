"use client";
import React from "react";

export default function SlidingAnimation({ collections, direction = "left" }) {
  const duplicatedCollections = [
    ...collections,
    ...collections,
    ...collections,
  ];
  const animationClass =
    direction === "left"
      ? "animate-infinite-scroll-left"
      : "animate-infinite-scroll-right";

  return (
    <div className="relative w-full overflow-hidden py-8">
      <div className={`flex ${animationClass} gap-8`}>
        {duplicatedCollections.map((collection, index) => (
          <div key={`${collection.id}-${index}`} className="mx-4 flex-shrink-0">
            <a
              href={
                collection.handle ? `/collections/${collection.handle}` : "#"
              }
              className="group block"
            >
              <div className="px-8 py-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-rose-200 hover:border-rose-300 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌸</span>
                  <h3 className="text-lg font-semibold text-rose-800 group-hover:text-rose-600 transition-colors">
                    {collection.title}
                  </h3>
                </div>
                <div className="mt-2 text-sm text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Shop collection →
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
