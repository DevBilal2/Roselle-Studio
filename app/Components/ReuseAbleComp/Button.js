"use client";
import { motion } from "framer-motion";

const Button = ({ className, name, href }) => {
  const fillVariants = {
    rest: {
      width: 0,
      hieght: 0,
    },
    hover: {
      width: "100%",
      hieght: "100%",

      backgroundColor: "#00000",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    rest: { color: "#000" },
    hover: {
      color: "#fff",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.a
      href={href}
      className={`relative  overflow-hidden border-2 border-white rounded-full  cursor-pointer ${className}`}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      {/* Text */}
      <motion.span
        variants={textVariants}
        className="relative z-10 font-semibold flex whitespace-nowrap"
      >
        {name}
      </motion.span>

      {/* Center-Out Fill Circle */}
      <motion.span
        variants={fillVariants}
        className="absolute top-1/2 left-1/2 w-full h-full z-0 rounded-full"
        style={{
          transform: "translate(-50%, -50%)",
          transformOrigin: "center",
        }}
      />
    </motion.a>
  );
};

export default Button;
