// app/Components/NavBar.jsx
// No "use client" here — Server Component
import MobileMenu from "./MobileMenu";
import CartButton from "./CartButton";
import FeaturedProductsDropdown from "../FeaturedProductDropdown";
import Link from "next/link";
import {
  Home,
  Info,
  ShoppingBag,
  BookOpen,
  Mail,
  User,
  Search,
  Star,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Blogs", href: "/blogpage", icon: BookOpen },
  { name: "Contact Us", href: "/contact", icon: Mail },
];

export default function NavBar({ className, ulClassName }) {
  return (
    <nav
      className={`relative z-[1000] px-5 lg:px-8 xl:px-[8%] py-4 flex flex-col items-center transition-all duration-300 ease-in-out w-full 
        bg-stone-50/95 backdrop-blur-sm border-b border-stone-200/50 ${className}`}
    >
      {/* Top Row: Mobile Menu (left) + Logo (center) + Cart/Account (right) */}
      <div className="w-full flex items-center justify-between">
        {/* Mobile Menu Button - Left */}
        <div className="md:hidden">
          <MobileMenu navLinks={navLinks} theme="light" />
        </div>

        {/* Logo - Left on desktop, centered on mobile */}
        <Link
          href="#top"
          className="font-bold text-2xl text-stone-800 tracking-tight lg:mr-8"
        >
          Roselle Studio
        </Link>

        {/* Desktop Search Bar - In the middle */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <form action="/allproducts" method="GET" className="relative w-full">
            <input
              type="search"
              name="search"
              placeholder="Search flowers, bouquets..."
              className="w-full px-5 py-2.5 pl-12 text-stone-700 bg-white/80 backdrop-blur-sm border border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition-all text-sm"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search size={18} className="text-stone-500" />
            </div>
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 transform -translate-y-1/2 px-3 py-1.5 bg-stone-800 text-white rounded-full hover:bg-stone-900 transition-colors text-xs font-medium"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <CartButton className="text-rose-600 hover:text-rose-800 hover:scale-105 transition-all" />
          <Link
            href="/login"
            className="p-2 hover:bg-stone-200/40 rounded-full transition-colors hover:scale-105"
            title="Sign In"
          >
            <User size={20} className="text-stone-600" />
          </Link>
        </div>
      </div>

      {/* Desktop Navigation Row - Centered with icons on right */}
      <div className="w-full hidden md:flex items-center justify-center mt-4">
        <ul className="flex items-center gap-10  lg:ml-24 md:ml-10  ">
        <li className="flex items-center">
            <FeaturedProductsDropdown />
          </li>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isExternal =
              link.href.startsWith("http") || link.href.startsWith("mailto:");
            const isHash = link.href.startsWith("#");

            return (
              <li key={link.name} className="flex items-center">
                {isExternal || isHash ? (
                  <a
                    href={link.href}
                    className="no-underline whitespace-nowrap text-stone-700 hover:text-stone-800 transition-all duration-300 flex items-center gap-1.5 group"
                  >
                    <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-stone-600 after:transition-all after:duration-300 group-hover:after:w-full">
                      {link.name}
                    </span>
                    <Icon
                      size={15}
                      className="text-stone-600 group-hover:text-stone-800 transition-all group-hover:translate-x-0.5"
                    />
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="no-underline whitespace-nowrap text-stone-700 hover:text-stone-800 transition-all duration-300 flex items-center gap-1.5 group"
                  >
                    <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:w-0 after:bg-stone-600 after:transition-all after:duration-300 group-hover:after:w-full">
                      {link.name}
                    </span>
                    <Icon
                      size={15}
                      className="text-stone-600 group-hover:text-stone-800 transition-all group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </li>
            );
          })}

          {/* Featured Products Dropdown - Inserted as a separate item */}
         
        </ul>
      </div>

      {/* Mobile Bottom Navigation - Simple links */}
      {/* <div className="lg:hidden w-full mt-3">
        <div className="flex items-center justify-center gap-5 overflow-x-auto pb-1">
          {navLinks.slice(0, 4).map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="no-underline whitespace-nowrap text-stone-600 hover:text-stone-800 transition-colors duration-200 text-sm flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-stone-200/40"
              >
                <Icon size={14} className="text-stone-500" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div> */}
    </nav>
  );
}
