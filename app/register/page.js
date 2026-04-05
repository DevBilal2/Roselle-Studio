"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flower2,
  Mail,
  User,
  ArrowRight,
  ChevronLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { createCustomerInShopify, loginCustomer, getCustomerData } from "../lib/shopify";

function randomPassword(length = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let s = "";
  for (let i = 0; i < length; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [shopifyError, setShopifyError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email.trim()))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShopifyError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const nameParts = (formData.name || "").trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const password = randomPassword(12);
      const customerData = {
        email: formData.email.trim(),
        password,
        firstName,
        lastName,
        phone: "",
        acceptsMarketing: false,
      };

      await createCustomerInShopify(customerData);

      try {
        const tokenData = await loginCustomer(formData.email.trim(), password);
        if (tokenData?.accessToken) {
          const customerData = await getCustomerData(tokenData.accessToken);
          const userData = {
            id: customerData.id,
            shopifyId: customerData.id,
            firstName: customerData.firstName || "",
            lastName: customerData.lastName || "",
            email: customerData.email,
            phone: customerData.phone || "",
            acceptsMarketing: customerData.acceptsMarketing || false,
            createdAt: customerData.createdAt,
            accessToken: tokenData.accessToken,
            tokenExpires: tokenData.expiresAt,
          };
          if (typeof window !== "undefined") {
            localStorage.setItem("bloomcraft_user", JSON.stringify(userData));
            localStorage.setItem("bloomcraft_logged_in", "true");
            localStorage.setItem("bloomcraft_token", tokenData.accessToken);
          }
          setSuccess(true);
          router.replace("/Account");
          return;
        }
      } catch (_) {}
      setSuccess(true);
    } catch (error) {
      if (
        error.message?.includes("already exists") ||
        error.message?.toLowerCase().includes("taken")
      ) {
        setShopifyError(
          "This email is already registered. Please sign in or use a different email."
        );
      } else if (error.message?.includes("invalid")) {
        setShopifyError("Invalid email format. Please check your email address.");
      } else {
        setShopifyError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (shopifyError) {
      setShopifyError("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50/30 to-white">
      {/* Back Navigation */}
      <div className="px-5 lg:px-8 xl:px-[8%] py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-sm overflow-hidden border border-stone-200">
          {/* Top decorative line */}
          <div className="h-2 bg-gradient-to-r from-stone-800 to-stone-900"></div>

          {/* Success Message */}
          {success && (
            <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border border-green-200">
                  <Check className="text-green-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">
                    Rosélle Studio account created
                  </h3>
                  <p className="text-green-600 text-sm mt-1">
                    Your account was created. Use the link below if you need to sign in later.
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 mt-3 text-green-700 font-medium hover:text-green-800 text-sm"
                  >
                    <span>Go to sign in</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Shopify Error */}
          {shopifyError && (
            <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fadeIn">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5" size={20} />
                <div>
                  <h3 className="font-semibold text-red-800">
                    Registration Issue
                  </h3>
                  <p className="text-red-600 text-sm">{shopifyError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="p-8">
            {!success && (
              <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-stone-100 to-amber-100 rounded-full mb-4 border border-stone-200">
                <Flower2 className="text-stone-700" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-stone-800 mb-2">
                Create Account
              </h1>
              <p className="text-stone-600 text-sm">
                Enter your name and email. We&apos;ll create your account and sign you in.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-stone-800 mb-2">
                  Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-300 focus:border-transparent text-stone-800"
                    placeholder="Your name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-stone-800 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.email ? "border-red-300" : "border-stone-200"
                    } rounded-xl focus:ring-2 focus:ring-stone-300 focus:border-transparent text-stone-800`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-stone-800 text-white rounded-full hover:bg-stone-900 transition-all shadow-sm hover:shadow-md font-semibold flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed border border-stone-900"
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>

              <p className="text-center text-stone-600 text-sm mt-4">
                Already have an account?{" "}
                <Link href="/login" className="text-stone-800 font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
