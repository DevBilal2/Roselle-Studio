"use client";

const Button = ({ className, name, href }) => {
  return (
    <a
      href={href}
      className={`relative overflow-hidden border-2 border-white rounded-full cursor-pointer group ${className}`}
    >
      {/* Text */}
      <span className="relative z-10 font-semibold flex whitespace-nowrap text-black group-hover:text-white transition-colors duration-200">
        {name}
      </span>

      {/* Center-Out Fill Circle */}
      <span
        className="absolute top-1/2 left-1/2 w-0 h-0 z-0 rounded-full bg-black group-hover:w-full group-hover:h-full transition-all duration-500 ease-in-out"
        style={{
          transform: "translate(-50%, -50%)",
          transformOrigin: "center",
        }}
      />
    </a>
  );
};

export default Button;
