"use client";
import { useEffect, useRef, useState } from "react";

export default function LazySection({ children, className = "", rootMargin = "100px" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="animate-pulse text-stone-400">Loading...</div>
        </div>
      )}
    </div>
  );
}

