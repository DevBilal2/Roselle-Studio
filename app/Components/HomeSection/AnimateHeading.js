"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TypingHeading() {
  // Changed headings to match floral/business theme
  const headings = [
    "Create Memories",
    "Express Love",
    "Celebrate Moments",
    "Share Joy",
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
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
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, headings]);

  return (
    <div className="flex items-start justify-start h-20 mt-2">
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold flex">
        <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          {text}
        </span>
        <motion.span
          className="inline-block w-[3px] h-[1em] bg-rose-400 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
        {/* Optional: Add a floral icon that changes with each heading */}
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="ml-2"
        >
          {index === 0 && "🌸"}
          {index === 1 && "🌺"}
          {index === 2 && "💐"}
          {index === 3 && "🌷"}
        </motion.span>
      </div>
    </div>
  );
}
