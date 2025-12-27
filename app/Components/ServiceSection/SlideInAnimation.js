"use client";
import { motion } from "framer-motion";
import React from "react";

const SlideInAnimation = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration, delay: delay / 1000 }}
      viewport={{ once: true, amount: 0.2 }} // amount = how much must be visible to trigger
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SlideInAnimation;
