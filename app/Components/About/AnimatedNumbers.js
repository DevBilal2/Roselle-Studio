"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedNumbers = ({ target, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animateCount = () => {
    const startTime = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const current = Math.floor(progress * target);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <motion.span
      onViewportEnter={() => {
        if (!hasAnimated) {
          animateCount();
          setHasAnimated(true);
        }
      }}
      viewport={{ once: true, amount: 0.6 }} // 60% visible, only once
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
};

export default AnimatedNumbers;
