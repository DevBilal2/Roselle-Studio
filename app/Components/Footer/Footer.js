import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Leaf,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-stone-50 to-white border-t border-stone-200 px-5 py-12 lg:px-8 xl:px-[8%] text-stone-900">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-12">
        {/* Logo + Description */}
        <div className="flex flex-col gap-6 w-full lg:w-[35%]">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">🌸</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-stone-700 to-stone-900 bg-clip-text text-transparent">
              Roselle Studio
            </div>
          </div>

          <p className="text-stone-700 leading-relaxed">
            Crafting beautiful floral arrangements that bring joy and celebrate
            life's special moments. Fresh blooms delivered with love and care.
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-3 py-1 bg-stone-100 text-stone-700 text-sm rounded-full border border-stone-200">
              🌿 Fresh Daily
            </span>
            <span className="px-3 py-1 bg-stone-100 text-stone-700 text-sm rounded-full border border-stone-200">
              🚚 Free Delivery
            </span>
            <span className="px-3 py-1 bg-stone-100 text-stone-700 text-sm rounded-full border border-stone-200">
              🎨 Custom Designs
            </span>
          </div>
        </div>

        {/* Newsletter + Navigation + Socials */}
        <div className="flex flex-col w-full lg:w-[60%]">
          {/* Newsletter */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Mail size={20} className="text-amber-600" />
              <h3 className="text-xl font-semibold text-stone-800">
                Join Our Floral Family
              </h3>
            </div>
            <p className="text-stone-600 mb-4">
              Get weekly inspiration, exclusive offers, and floral tips
              delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="email"
                placeholder="Your email address"
                className="px-5 py-3 rounded-xl border border-stone-200 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent w-full sm:flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-stone-700 to-stone-800 text-white rounded-xl hover:from-stone-800 hover:to-stone-900 transition-all duration-300 font-medium flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Leaf size={16} />
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="border-t border-stone-200 my-6"></div>

          {/* Navigation + Contact + Socials */}
          <div className="flex flex-col md:flex-row gap-12">
            {/* Quick Links */}
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
                <span>🌷</span> Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#top"
                    className="text-stone-600 hover:text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-500">→</span> Home
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-stone-600 hover:text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-500">→</span> Shop All
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-stone-600 hover:text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-500">→</span> Our Story
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-stone-600 hover:text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-500">→</span> Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-stone-600 hover:text-stone-800 transition-colors flex items-center gap-2"
                  >
                    <span className="text-amber-500">→</span> FAQs
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
                <span>💐</span> Collections
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    Wedding Flowers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    Seasonal Blooms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    Luxury Arrangements
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    Gift Bouquets
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    Subscription Boxes
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info + Socials */}
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold text-stone-800 mb-4 flex items-center gap-2">
                <span>📞</span> Contact Us
              </h4>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-stone-600">Call us at</p>
                    <p className="font-medium text-stone-800">
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-stone-600">Email us at</p>
                    <p className="font-medium text-stone-800">
                      hello@bloomcraft.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-stone-600">Visit our shop</p>
                    <p className="font-medium text-stone-800">
                      123 Floral Lane, Bloomington
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-sm text-stone-600 mb-3">Follow Our Blooms</p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="p-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="p-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="p-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    className="p-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                  >
                    <span className="text-lg">📌</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-stone-200 mt-12 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <p className="text-stone-700">
              © 2024 BloomCraft. All flowers are loved.
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-stone-600 hover:text-stone-800 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-stone-600 hover:text-stone-800 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-stone-600 hover:text-stone-800 transition-colors"
            >
              Shipping Policy
            </a>
            <a
              href="#"
              className="text-stone-600 hover:text-stone-800 transition-colors"
            >
              Return Policy
            </a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 text-center">
          <p className="text-sm text-stone-500 mb-3">We Accept</p>
          <div className="flex justify-center gap-4">
            <span className="text-lg">💳</span>
            <span className="text-lg">🏦</span>
            <span className="text-lg">📱</span>
            <span className="text-lg">💎</span>
          </div>
        </div>

        {/* Made with love */}
        <div className="text-center mt-8">
          <p className="text-sm text-stone-400 flex items-center justify-center gap-2">
            <span className="text-lg">❤️</span>
            Made with love and fresh blooms
            <span className="text-lg">🌿</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
