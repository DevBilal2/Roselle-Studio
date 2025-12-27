"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("flowerShopCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("flowerShopCart", JSON.stringify(cartItems));
  }, [cartItems]);
  const extractShopifyId = (id) => {
    if (!id) return null;
    // Handle both formats: gid://shopify/Product/8696221532298 or just 8696221532298
    if (typeof id === "string" && id.includes("/")) {
      const parts = id.split("/");
      return parts[parts.length - 1]; // Get last part: 8696221532298
    }
    return String(id); // Return as string for consistency
  };

  const addToCart = (product, quantity = 1, color = "", size = "") => {
    console.log("Adding to cart - Product ID:", product.id);

    // Extract the numeric ID for comparison
    const productId = extractShopifyId(product.id);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          extractShopifyId(item.id) === productId &&
          item.color === color &&
          item.size === size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          extractShopifyId(item.id) === productId &&
          item.color === color &&
          item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            // Store the ORIGINAL GraphQL ID
            id: product.id, // Keep original: "gid://shopify/Product/8696221532298"
            name: product.Heading || product.title || product.name,
            price:
              typeof product.price === "string"
                ? parseFloat(product.price.replace(/[^0-9.]/g, ""))
                : Number(product.price) || 0,
            quantity: quantity,
            color,
            size,
            image: product.image || product.images?.[0],
            productData: product,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
