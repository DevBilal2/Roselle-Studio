"use client";
import React from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";

const CartIcon = () => {
  const { getCartCount, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-stone-800 to-stone-900 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
    >
      <div className="relative">
        <ShoppingBag size={24} />
        {getCartCount() > 0 && (
          <span className="absolute -top-2 -right-2 px-2 py-1 bg-white text-stone-800 text-xs font-bold rounded-full min-w-[20px] flex items-center justify-center">
            {getCartCount()}
          </span>
        )}
      </div>
      <div className="absolute -top-10 right-0 bg-stone-700 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        View Cart
      </div>
    </button>
  );
};

export default CartIcon;
