"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Flower2,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
  ChevronLeft,
  Check,
  AlertCircle,
} from "lucide-react";
import { createCustomerInShopify } from "../lib/shopify";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptsMarketing: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [shopifyError, setShopifyError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShopifyError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const nameParts = formData.name ? formData.name.split(" ") : [];
      const firstName = nameParts[0] || formData.firstName;
      const lastName = nameParts.slice(1).join(" ") || formData.lastName || "";

      const customerData = {
        email: formData.email,
        password: formData.password,
        firstName: firstName,
        lastName: lastName,
        phone: formData.phone || "",
        acceptsMarketing: formData.acceptsMarketing,
      };

      console.log("Creating customer in Shopify:", customerData);

      const shopifyCustomer = await createCustomerInShopify(customerData);

      console.log("Shopify customer created:", shopifyCustomer);

      const userData = {
        id: shopifyCustomer.id || `shopify_${Date.now()}`,
        shopifyId: shopifyCustomer.id,
        firstName: firstName,
        lastName: lastName,
        email: formData.email,
        phone: formData.phone || "Not provided",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("bloomcraft_user", JSON.stringify(userData));
      localStorage.setItem("bloomcraft_logged_in", "true");
      localStorage.setItem("bloomcraft_token", `shopify_${Date.now()}`);

      setSuccess(true);

      setTimeout(() => {
        router.push("/Account");
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);

      if (
        error.message.includes("already exists") ||
        error.message.includes("taken")
      ) {
        setShopifyError(
          "This email is already registered. Please use a different email or try logging in."
        );
      } else if (error.message.includes("invalid")) {
        setShopifyError(
          "Invalid email format. Please check your email address."
        );
      } else {
        setShopifyError(
          `Registration failed: ${error.message}. Please try again.`
        );
      }

      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "Not provided",
        createdAt: new Date().toISOString(),
        shopifyError: true,
      };
      localStorage.setItem("bloomcraft_user", JSON.stringify(userData));
      localStorage.setItem("bloomcraft_logged_in", "true");
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
                    Account Created Successfully!
                  </h3>
                  <p className="text-green-600 text-sm">
                    Redirecting to your account...
                  </p>
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
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-stone-100 to-amber-100 rounded-full mb-4 border border-stone-200">
                <Flower2 className="text-stone-700" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-stone-800 mb-2">
                Create Account
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-800 mb-2">
                    First Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 border ${
                        errors.firstName ? "border-red-300" : "border-stone-200"
                      } rounded-xl focus:ring-2 focus:ring-stone-300 focus:border-transparent text-stone-800`}
                      placeholder="First name"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-800 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-300 focus:border-transparent text-stone-800"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-stone-800 mb-2">
                  Email Address *
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

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-stone-800 mb-2">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                    size={18}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-300 focus:border-transparent text-stone-800"
                    placeholder="+92 300 1234567"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-stone-800 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-12 py-3 border ${
                      errors.password ? "border-red-300" : "border-stone-200"
                    } rounded-xl focus:ring-2 focus:ring-stone-300 focus:border-transparent text-stone-800`}
                    placeholder="At least 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-stone-800 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-stone-200"
                    } rounded-xl focus:ring-2 focus:ring-stone-300 focus:border-transparent text-stone-800`}
                    placeholder="Re-enter your password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Marketing Consent */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="acceptsMarketing"
                  name="acceptsMarketing"
                  checked={formData.acceptsMarketing}
                  onChange={handleChange}
                  className="h-4 w-4 text-stone-700 rounded border-stone-300 focus:ring-stone-300"
                />
                <label
                  htmlFor="acceptsMarketing"
                  className="ml-2 text-sm text-stone-700"
                >
                  I want to receive emails about new flowers and special offers
                </label>
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

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-stone-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-stone-300 text-stone-700 rounded-full hover:bg-stone-50 transition-colors font-medium"
                >
                  <span>Sign in to your account</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
