"use client";
import React from "react";

const FloatingLabelInput = ({ label, className = "", ...props }) => {
  return (
    <div className="relative w-full">
      <input
        {...props}
        required
        placeholder=" "
        className={`peer text-black w-full border bg-white border-gray-300 rounded-md p-3 pt-6 pb-2 focus:outline-none placeholder-white ${className}`}
      />
      <label
        htmlFor={props.id || props.name}
        className="font-semibold absolute left-3 px-1 text-lg  transition-all
                   top-5 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                   peer-focus:-top-5 peer-focus:text-sm
                   peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-sm
                   pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
