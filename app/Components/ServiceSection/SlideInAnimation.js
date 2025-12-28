"use client";
import { useEffect, useRef, useState } from "react";

const SlideInAnimation = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
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
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[${duration * 1000}ms] ${
        isVisible
          ? "opacity-100 translate-y-0"
          : `opacity-0 translate-y-[${y}px]`
      } ${className}`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}ms`,
        transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default SlideInAnimation;
