"use client";

import { useEffect, useState } from "react";

export default function TypingHeading() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [iconKey, setIconKey] = useState(0);

  useEffect(() => {
    // Changed headings to match floral/business theme
    const headings = [
      "Create Memories",
      "Express Love",
      "Celebrate Moments",
      "Share Joy",
    ];
    const current = headings[index];
    let typingSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        // Deleting backward
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          // Move to next word
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % headings.length);
          setIconKey((prev) => prev + 1); // Trigger icon animation
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index]);

  return (
    <div className="flex items-start justify-start h-20 mt-2">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold flex">
        <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          {text}
        </span>
        <span className="inline-block w-[3px] h-[1em] bg-rose-400 ml-1 animate-pulse" />
        {/* Optional: Add a floral icon that changes with each heading */}
        <span
          key={iconKey}
          className="ml-2 animate-fade-in-scale"
          style={{
            animation: 'fadeInScale 0.3s ease-out',
          }}
        >
          {index === 0 && "🌸"}
          {index === 1 && "🌺"}
          {index === 2 && "💐"}
          {index === 3 && "🌷"}
        </span>
      </div>
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
