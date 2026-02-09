import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  return (
    <header className="flex w-full flex-col shadow-sm">
      {/* TOP BAR */}
      <div className="hidden w-full bg-[#252B42] text-white md:flex">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2 text-[11px] font-bold tracking-wider">
          <div className="flex items-center gap-6">
            <a
              href="tel:2255550118"
              className="flex items-center gap-2 transition-colors hover:text-[#23A6F0]"
            >
              <Phone size={12} />
              <span>(225) 555-0118</span>
            </a>
            <a
              href="mailto:michelle.rivera@example.com"
              className="flex items-center gap-2 transition-colors hover:text-[#23A6F0]"
            >
              <Mail size={12} />
              <span>michelle.rivera@example.com</span>
            </a>
          </div>

          <span className="hidden opacity-80 lg:block">
            Follow Us and get a chance to win 80% off
          </span>

          <div className="flex items-center gap-3">
            <span className="hidden opacity-80 lg:inline">Follow Us :</span>
            <div className="flex gap-3">
              {[Instagram, Youtube, Facebook, Twitter].map((Icon, i) => (
                <Icon
                  key={i}
                  size={14}
                  className="cursor-pointer transition-all hover:scale-125 hover:text-[#23A6F0]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="sticky top-0 z-50 flex w-full bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="group flex items-center">
            <span className="text-2xl font-black tracking-tighter text-[#252B42] transition-colors group-hover:text-[#23A6F0]">
              Bandage
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-6 text-[13px] font-black uppercase tracking-widest text-[#737373] md:flex">
            <Link
              to="/"
              className="group relative text-[#252B42] transition-colors hover:text-[#23A6F0]"
            >
              Home
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#23A6F0] transition-all group-hover:w-full" />
            </Link>

            {/* SHOP */}
            <div className="group relative">
              <Link
                to="/shop"
                className="flex items-center gap-1 transition-colors hover:text-[#23A6F0]"
              >
                Shop
                <ChevronDown
                  size={14}
                  className="transition-transform group-hover:rotate-180"
                />
              </Link>

              <div className="invisible absolute left-0 right-0 top-full h-8 group-hover:visible" />

              <div className="invisible absolute left-1/2 top-[120%] z-50 mt-2 w-[820px] -translate-x-1/2 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:visible group-hover:top-full group-hover:opacity-100">
                <div className="mx-auto h-3 w-3 rotate-45 bg-white shadow-[-1px_-1px_0_rgba(0,0,0,0.02)]" />

                <div className="overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.03]">
                  <div className="grid grid-cols-2 px-6 py-6">
                    <div className="rounded-[1.5rem] p-8 transition-colors hover:bg-gray-50/50">
                      <h4 className="mb-6 text-sm font-black tracking-widest text-[#252B42]">
                        KADIN
                      </h4>
                    </div>

                    <div className="border-l border-gray-100 bg-gray-50/30 p-8">
                      <h4 className="mb-6 text-sm font-black tracking-widest text-[#252B42]">
                        ERKEK
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#252B42] px-10 py-3 text-[10px] font-bold text-white/70">
                    <span>TRENDING: OVERSIZE TEE • CARGO PANTS</span>
                    <Link
                      to="/shop"
                      className="text-white transition-colors hover:text-[#23A6F0]"
                    >
                      YENİLERİ GÖR →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT / BLOG / CONTACT */}
            <Link
              to="/"
              className="group relative transition-colors hover:text-[#23A6F0]"
            >
              About
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#23A6F0] transition-all group-hover:w-full" />
            </Link>

            <Link
              to="/"
              className="group relative transition-colors hover:text-[#23A6F0]"
            >
              Blog
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#23A6F0] transition-all group-hover:w-full" />
            </Link>

            {/* 🔴 T5 – CONTACT */}
            <Link
              to="/contact"
              className="group relative transition-colors hover:text-[#23A6F0]"
            >
              Contact
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#23A6F0] transition-all group-hover:w-full" />
            </Link>
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3 text-[#23A6F0]">
            <Link
              to="/"
              className="hidden items-center gap-2 text-xs font-black uppercase transition-opacity hover:opacity-70 md:flex"
            >
              <User size={16} />
              Login / Register
            </Link>

            <button className="rounded-full p-2 transition-colors hover:bg-blue-50">
              <Search size={18} />
            </button>

            <button className="group flex items-center gap-1 rounded-full p-2 transition-colors hover:bg-blue-50">
              <ShoppingCart
                size={18}
                className="transition-transform group-hover:rotate-12"
              />
              <span className="text-[10px] font-black">1</span>
            </button>

            <button className="group flex items-center gap-1 rounded-full p-2 transition-colors hover:bg-blue-50">
              <Heart
                size={18}
                className="transition-transform group-hover:scale-125"
              />
              <span className="text-[10px] font-black">1</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="flex w-full border-t border-gray-50 bg-white md:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-[11px] font-black uppercase tracking-tighter text-[#737373]">
          <Link to="/" className="hover:text-[#23A6F0]">Home</Link>
          <Link to="/shop" className="hover:text-[#23A6F0]">Shop</Link>
          <Link to="/" className="hover:text-[#23A6F0]">About</Link>
          <Link to="/" className="hover:text-[#23A6F0]">Blog</Link>
          {/* 🔴 T5 – CONTACT */}
          <Link to="/contact" className="hover:text-[#23A6F0]">Contact</Link>
        </div>
      </div>
    </header>
  );
}
