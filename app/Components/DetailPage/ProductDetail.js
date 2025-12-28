"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  Shield,
  Leaf,
  ChevronLeft,
  Plus,
  Minus,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Calendar,
} from "lucide-react";

export default function ProductDetail({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || "Classic White"
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || "Standard"
  );
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [expandedReviews, setExpandedReviews] = useState(false);
  const { addToCart } = useCart();
  const images = product.images || [product.image];

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment:
        "Absolutely stunning arrangement! The flowers arrived fresh and lasted over two weeks. The fragrance was heavenly!",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "1 week ago",
      comment:
        "Beautiful bouquet, perfect for my anniversary. My wife loved it!",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Best flowers I've ever received! The quality is exceptional and delivery was right on time.",
      verified: false,
    },
    {
      id: 4,
      name: "David Wilson",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great value for money. The flowers were fresh and the arrangement was exactly as shown.",
      verified: true,
    },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlist = () => {
    setAddedToWishlist(!addedToWishlist);
    alert(
      `${product.Heading} ${
        addedToWishlist ? "removed from" : "added to"
      } wishlist!`
    );
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // If no product data, show loading/error
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-stone-500 text-xl">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50/30 to-white">
      {/* Back Navigation */}
      <div className="px-5 lg:px-8 xl:px-[8%] py-4">
        <a
          href="/allproducts"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Products</span>
        </a>
      </div>

      <div className=" mx-auto px-5 lg:px-8 xl:px-[8%] py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images Section */}
          <div>
            {/* Main Image */}
            <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-stone-50 to-amber-50 border border-stone-200 mb-6">
              {images[selectedImage] ? (
                <Image
                  src={images[selectedImage]}
                  alt={`${product.Heading} - Image ${selectedImage + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl text-stone-300">🌸</div>
                </div>
              )}

              {/* Product Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full border border-emerald-700">
                    New Arrival
                  </span>
                )}
                {product.bestSeller && (
                  <span className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full border border-amber-700">
                    Best Seller
                  </span>
                )}
                {product.discount && (
                  <span className="px-3 py-1 bg-stone-800 text-white text-xs font-medium rounded-full border border-stone-900">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                aria-label={addedToWishlist ? `Remove ${product.Heading} from wishlist` : `Add ${product.Heading} to wishlist`}
                className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110 border border-stone-200"
              >
                <Heart
                  size={22}
                  aria-hidden="true"
                  className={
                    addedToWishlist
                      ? "fill-stone-700 text-stone-700"
                      : "text-stone-600"
                  }
                />
              </button>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    className={`flex-shrink-0 relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-stone-700 ring-2 ring-stone-200"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    {img ? (
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50">
                        <div className="text-xl text-stone-300">🌸</div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div>
            {/* Brand & Category */}
            <div className="mb-4">
              <span className="text-sm font-medium text-stone-600 uppercase tracking-wider">
                {product.brand || "ROSELLE STUDIO"}
              </span>
              <div className="flex items-center gap-2 mt-1">
                {product.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-stone-100 text-stone-700 text-xs rounded-full border border-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-800 mb-4">
              {product.Heading}
            </h1>

            {/* Rating & Stock */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < 4 ? "fill-amber-400 text-amber-400" : "text-stone-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-stone-700 font-medium">4.8</span>
              </div>
              <span className="text-stone-500">•</span>
              <span className="text-stone-700">128 reviews</span>
              <span className="text-stone-500">•</span>
              <span className="text-emerald-600 font-medium">In Stock</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold text-stone-800">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-stone-400 line-through">
                      {product.originalPrice}
                    </span>
                    <span className="px-3 py-1 bg-stone-100 text-stone-700 text-sm font-medium rounded-full border border-stone-200">
                      Save {product.discount || "20"}%
                    </span>
                  </>
                )}
              </div>
              {product.shipping && (
                <p className="text-stone-500 mt-2">{product.shipping}</p>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Color: <span className="font-normal">{selectedColor}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-stone-700 bg-stone-50 text-stone-800 font-medium"
                          : "border-stone-300 hover:border-stone-400 text-stone-600"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-stone-800 mb-3">
                  Size: <span className="font-normal">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border-2 transition-all ${
                        selectedSize === size
                          ? "border-stone-700 bg-stone-50 text-stone-800 font-medium"
                          : "border-stone-300 hover:border-stone-400 text-stone-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-stone-800 mb-3">
                Quantity
              </h3>
              <div className="flex items-center border-2 border-stone-300 rounded-full p-1 w-fit">
                <button
                  onClick={decrementQuantity}
                  className="p-3 text-stone-600 hover:text-stone-800 hover:bg-stone-50 rounded-full"
                >
                  <Minus size={20} />
                </button>
                <span className="px-6 text-xl font-semibold text-stone-800 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="p-3 text-stone-600 hover:text-stone-800 hover:bg-stone-50 rounded-full"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-stone-800 text-white rounded-full hover:bg-stone-900 transition-all duration-300 shadow-sm hover:shadow-md font-semibold flex items-center justify-center gap-3 border border-stone-900"
              >
                <ShoppingBag size={22} />
                <span>Add to Cart • {product.price}</span>
              </button>
            </div>

            {/* Features */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Truck className="text-stone-700" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Free Delivery</h4>
                  <p className="text-sm text-stone-600">24-48 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Shield className="text-stone-700" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">
                    Freshness Guarantee
                  </h4>
                  <p className="text-sm text-stone-600">7-day guarantee</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Leaf className="text-stone-700" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-stone-800">Eco-Friendly</h4>
                  <p className="text-sm text-stone-600">Sustainable</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Tabs Section - Description & Reviews */}
        <div className="mt-12 mb-16">
          {/* Tabs Navigation */}
          <div className="flex border-b border-stone-200 mb-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-3 text-lg font-medium transition-colors relative ${
                activeTab === "description"
                  ? "text-stone-800"
                  : "text-stone-500 hover:text-stone-600"
              }`}
            >
              Description
              {activeTab === "description" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-800"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-3 text-lg font-medium transition-colors relative ${
                activeTab === "reviews"
                  ? "text-stone-800"
                  : "text-stone-500 hover:text-stone-600"
              }`}
            >
              Reviews
              {activeTab === "reviews" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-800"></div>
              )}
            </button>
          </div>

          {/* Description Tab Content */}
          {activeTab === "description" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-stone-800 mb-4">
                  Product Details
                </h3>
                <p className="text-stone-700 leading-relaxed text-lg">
                  {product.fullDescription ||
                    product.description ||
                    "This exquisite floral arrangement is handcrafted by our master florists using only the freshest, most vibrant blooms. Each flower is carefully selected for its beauty, fragrance, and longevity. Perfect for special occasions, gifts, or adding elegance to your home decor."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-stone-800 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check
                        className="text-emerald-600 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-stone-700">
                        Hand-selected premium blooms
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        className="text-emerald-600 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-stone-700">
                        Long-lasting freshness guarantee
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        className="text-emerald-600 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-stone-700">
                        Eco-friendly biodegradable packaging
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check
                        className="text-emerald-600 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span className="text-stone-700">
                        Expert floral arrangement design
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-stone-800 mb-3">
                    Care Instructions
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-stone-600 font-medium">💧</span>
                      <span className="text-stone-700">
                        Change water every 2 days
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone-600 font-medium">🌡️</span>
                      <span className="text-stone-700">
                        Keep in cool room temperature
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone-600 font-medium">☀️</span>
                      <span className="text-stone-700">
                        Avoid direct sunlight
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone-600 font-medium">✂️</span>
                      <span className="text-stone-700">
                        Trim stems at an angle every 3 days
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab Content */}
          {activeTab === "reviews" && (
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-stone-800">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className="fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-2xl font-bold text-stone-800">
                        4.8
                      </span>
                    </div>
                    <span className="text-stone-500">•</span>
                    <span className="text-stone-700">Based on 128 reviews</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-stone-100 text-stone-700 rounded-full hover:bg-stone-200 transition-colors font-medium border border-stone-200">
                  Write a Review
                </button>
              </div>

              {/* Review Stats */}
              <div className="bg-gradient-to-r from-stone-50 to-amber-50 rounded-2xl p-6 mb-8 border border-stone-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-stone-800">95%</div>
                    <div className="text-stone-600">Recommend</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-stone-800">98%</div>
                    <div className="text-stone-600">Freshness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-stone-800">96%</div>
                    <div className="text-stone-600">Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-stone-800">94%</div>
                    <div className="text-stone-600">Value</div>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews
                  .slice(0, expandedReviews ? reviews.length : 2)
                  .map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-2xl p-6 border border-stone-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-stone-100 to-amber-100 rounded-full flex items-center justify-center border border-stone-200">
                            <span className="text-stone-700 font-semibold">
                              {review.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-stone-800">
                                {review.name}
                              </h4>
                              {review.verified && (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full border border-emerald-200">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={`${
                                      i < review.rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-stone-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-stone-500 text-sm">•</span>
                              <span className="text-stone-600 text-sm flex items-center gap-1">
                                <Calendar size={12} />
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-stone-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Show More/Less Button */}
              {reviews.length > 2 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setExpandedReviews(!expandedReviews)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-700 rounded-full hover:bg-stone-200 transition-colors font-medium border border-stone-200"
                  >
                    {expandedReviews ? (
                      <>
                        Show Less
                        <ChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Show More Reviews
                        <ChevronDown size={20} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
