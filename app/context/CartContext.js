"use client";
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount - defer to avoid blocking
  useEffect(() => {
    // Use requestIdleCallback to defer non-critical work
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("flowerShopCart");
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadCart, { timeout: 2000 });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(loadCart, 0);
      }
    }
  }, []);

  // Save cart to localStorage on change - debounce aggressively for mobile
  useEffect(() => {
    if (cartItems.length === 0) return; // Don't save empty cart on mount

    // Use requestIdleCallback for mobile performance - don't block main thread
    const saveCart = () => {
      try {
        localStorage.setItem("flowerShopCart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    };

    let timeoutId;
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      // Use requestIdleCallback for better mobile performance
      const idleId = requestIdleCallback(saveCart, { timeout: 1000 });
      return () => cancelIdleCallback(idleId);
    } else {
      // Fallback: debounce with longer timeout for mobile
      timeoutId = setTimeout(saveCart, 500);
      return () => clearTimeout(timeoutId);
    }
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

  const addToCart = useCallback((product, quantity = 1, color = "", size = "") => {
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
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const getCartCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const openCart = React.useCallback(() => setIsCartOpen(true), []);
  const closeCart = React.useCallback(() => setIsCartOpen(false), []);
  const toggleCart = React.useCallback(() => setIsCartOpen(prev => !prev), []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
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
    }),
    [cartItems, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, openCart, closeCart, toggleCart]
  );

  return (
    <CartContext.Provider value={contextValue}>
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
