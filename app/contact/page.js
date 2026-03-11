"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "4f59a8ec-acc5-4d94-b696-dd01d7af89b4";
    formData.append("access_key", accessKey);
    formData.append(
      "subject",
      `Contact: ${formData.get("firstName") || ""} ${formData.get("lastName") || ""}`.trim() || "Rosélle Studio contact form"
    );
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="contact"
      className="scroll-mt-16 w-full min-h-screen bg-gradient-to-b from-stone-50 to-white text-stone-800 flex items-center justify-center px-5 py-16 lg:px-8 xl:px-[8%]"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Panel */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full mb-4 border border-stone-200">
              <span className="text-lg">💌</span>
              <span className="text-sm font-medium text-stone-700 uppercase tracking-wider">
                Get in Touch
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-stone-800">
              Let&apos;s Connect
            </h2>

            <p className="text-lg text-stone-600">
              Have questions about our floral arrangements? Need a custom
              bouquet for a special occasion? We&apos;re here to help bring your
              floral vision to life.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200">
              <CheckCircle
                className="text-emerald-600 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <h4 className="font-semibold text-stone-800">
                  Fresh Daily Delivery
                </h4>
                <p className="text-sm text-stone-600">
                  Hand-delivered fresh blooms
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200">
              <CheckCircle
                className="text-emerald-600 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <h4 className="font-semibold text-stone-800">
                  Custom Arrangements
                </h4>
                <p className="text-sm text-stone-600">
                  Personalized designs just for you
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-stone-200">
              <CheckCircle
                className="text-emerald-600 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div>
                <h4 className="font-semibold text-stone-800">
                  Same Day Service
                </h4>
                <p className="text-sm text-stone-600">Urgent orders welcome</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 mt-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-stone-800 rounded-full border border-stone-900">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Call Us</p>
                <a href="tel:+923436951448" className="font-semibold text-stone-800 hover:text-amber-600 transition-colors">
                  +92 343 6951448
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-stone-800 rounded-full border border-stone-900">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Email Us</p>
                <a href="mailto:rosellestudioofficial@gmail.com" className="font-semibold text-stone-800 hover:text-amber-600 transition-colors">
                  rosellestudioofficial@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-stone-800 rounded-full border border-stone-900">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Based in</p>
                <p className="font-semibold text-stone-800">
                  Lahore, Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="relative">
          {/* Decorative floral background */}
          <div className="absolute -top-6 -right-6 text-6xl text-stone-200/30">
            🌸
          </div>
          <div className="absolute -bottom-6 -left-6 text-6xl text-amber-200/30">
            🌺
          </div>

          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl p-8 shadow-sm border border-stone-200 space-y-6 z-10"
          >
            <div className="text-center mb-2">
              <h3 className="text-2xl font-bold text-stone-800 mb-2">
                Send a Message
              </h3>
              <p className="text-stone-600">We&apos;ll respond within 24 hours</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  First Name *
                </label>
                <input
                  name="firstName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Last Name *
                </label>
                <input
                  name="lastName"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all"
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email Address *
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                What&apos;s your occasion?
              </label>
              <select
                name="occasion"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all"
              >
                <option value="">Select an occasion</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="wedding">Wedding</option>
                <option value="sympathy">Sympathy</option>
                <option value="thankyou">Thank You</option>
                <option value="justbecause">Just Because</option>
                <option value="corporate">Corporate Event</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Your Message *
              </label>
              <textarea
                name="message"
                rows="4"
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent transition-all resize-none"
                placeholder="Tell us about your floral needs..."
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                id="terms"
                className="mt-1 rounded border-stone-300 text-stone-700 focus:ring-stone-300"
              />
              <label htmlFor="terms" className="text-sm text-stone-600">
                I agree to Rosélle Studio&apos;s{" "}
                <span className="text-stone-700 font-medium underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-stone-700 font-medium underline">
                  Privacy Policy
                </span>
              </label>
            </div>

            {status === "success" && (
              <p className="text-center py-3 px-4 bg-emerald-50 text-emerald-800 rounded-xl text-sm border border-emerald-200">
                Message sent! We&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-center py-3 px-4 bg-red-50 text-red-800 rounded-xl text-sm border border-red-200">
                Something went wrong. Please try again or email us directly.
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-stone-800 text-white font-semibold rounded-xl hover:bg-stone-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 group border border-stone-900 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <p className="text-center text-sm text-stone-500 mt-4">
              🌸 We&apos;ll respond in your inbox soon!
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
