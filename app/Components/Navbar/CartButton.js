"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartButton = () => {
  const { getCartCount, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 hover:bg-rose-50 rounded-full transition-colors"
    >
      <ShoppingCart className="text-black" size={20} />
      {getCartCount() > 0 && (
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-black text-white text-xs font-bold rounded-full min-w-[18px] flex items-center justify-center">
          {getCartCount()}
        </span>
      )}
    </button>
  );
};

export default CartButton;
