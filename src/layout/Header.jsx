import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Animasyon için eklendi
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
            <a href="tel:2255550118" className="flex items-center gap-2 hover:text-[#23A6F0] transition-colors">
              <Phone size={12} />
              <span>(225) 555-0118</span>
            </a>
            <a href="mailto:michelle.rivera@example.com" className="flex items-center gap-2 hover:text-[#23A6F0] transition-colors">
              <Mail size={12} />
              <span>michelle.rivera@example.com</span>
            </a>
          </div>

          <span className="hidden lg:block opacity-80">
            Follow Us and get a chance to win 80% off
          </span>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline opacity-80">Follow Us :</span>
            <div className="flex gap-3">
              {[Instagram, Youtube, Facebook, Twitter].map((Icon, i) => (
                <Icon key={i} size={14} className="cursor-pointer hover:scale-125 hover:text-[#23A6F0] transition-all" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="flex w-full bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-black tracking-tighter text-[#252B42] group-hover:text-[#23A6F0] transition-colors">
              Bandage
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-6 text-[13px] font-black uppercase tracking-widest text-[#737373] md:flex">
            <Link to="/" className="text-[#252B42] hover:text-[#23A6F0] transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#23A6F0] transition-all group-hover:w-full" />
            </Link>

            {/* ✅ SHOP MEGA MENU */}
            <div className="group relative">
              <Link
                to="/shop"
                className="flex items-center gap-1 transition-colors hover:text-[#23A6F0]"
              >
                Shop <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
              </Link>

              {/* Hover bridge */}
              <div className="invisible absolute left-0 right-0 top-full h-8 group-hover:visible" />

              {/* Dropdown wrapper */}
              <div
                className="
                  invisible absolute left-1/2 top-[120%] z-50 mt-2 w-[820px]
                  -translate-x-1/2 opacity-0
                  transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                  group-hover:visible group-hover:top-full group-hover:opacity-100
                "
              >
                {/* caret */}
                <div className="mx-auto h-3 w-3 rotate-45 bg-white shadow-[-1px_-1px_0_rgba(0,0,0,0.02)]"></div>

                {/* panel */}
                <div className="rounded-[2rem] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.03] overflow-hidden">
                  <div className="grid grid-cols-2 gap-0 px-6 py-6">
                    {/* Kadın */}
                    <div className="p-8 hover:bg-gray-50/50 transition-colors rounded-[1.5rem]">
                      <div className="mb-6 flex items-center justify-between">
                        <h4 className="text-sm font-black text-[#252B42] tracking-widest">KADIN</h4>
                        <Link to="/shop?cat=kadin" className="text-[10px] font-bold text-[#23A6F0] hover:underline">TÜMÜ</Link>
                      </div>
                      <ul className="grid grid-cols-2 gap-y-3 text-xs font-bold">
                        {["Tişört", "Ayakkabı", "Ceket", "Elbise", "Etek", "Gömlek", "Kazak", "Pantolon"].map((label) => (
                          <li key={label}>
                            <Link to="/shop" className="hover:text-[#23A6F0] transition-colors flex items-center gap-2 group/item">
                              <span className="h-1 w-1 rounded-full bg-gray-300 group-hover/item:w-3 group-hover/item:bg-[#23A6F0] transition-all" />
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Erkek */}
                    <div className="p-8 bg-gray-50/30 border-l border-gray-100">
                      <div className="mb-6 flex items-center justify-between">
                        <h4 className="text-sm font-black text-[#252B42] tracking-widest">ERKEK</h4>
                        <Link to="/shop?cat=erkek" className="text-[10px] font-bold text-[#23A6F0] hover:underline">TÜMÜ</Link>
                      </div>
                      <ul className="grid grid-cols-2 gap-y-3 text-xs font-bold">
                        {["Tişört", "Ayakkabı", "Ceket", "Gömlek", "Kazak", "Pantolon"].map((label) => (
                          <li key={label}>
                            <Link to="/shop" className="hover:text-[#23A6F0] transition-colors flex items-center gap-2 group/item">
                              <span className="h-1 w-1 rounded-full bg-gray-300 group-hover/item:w-3 group-hover/item:bg-[#23A6F0] transition-all" />
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* bottom strip */}
                  <div className="bg-[#252B42] px-10 py-3 text-[10px] font-bold text-white/70 flex justify-between items-center">
                    <span>TRENDING: OVERSIZE TEE • CARGO PANTS</span>
                    <Link to="/shop" className="text-white hover:text-[#23A6F0] transition-colors">YENİLERİ GÖR →</Link>
                  </div>
                </div>
              </div>
            </div>

            {["About", "Blog", "Contact"].map((item) => (
               <Link key={item} to="/" className="hover:text-[#23A6F0] transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#23A6F0] transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3 text-[#23A6F0]">
            <Link to="/" className="hidden items-center gap-2 text-xs font-black uppercase md:flex hover:opacity-70 transition-opacity">
              <User size={16} />
              Login / Register
            </Link>

            <button className="p-2 hover:bg-blue-50 rounded-full transition-colors"><Search size={18} /></button>
            
            <button className="flex items-center gap-1 group p-2 hover:bg-blue-50 rounded-full transition-colors">
              <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-black">1</span>
            </button>

            <button className="flex items-center gap-1 group p-2 hover:bg-blue-50 rounded-full transition-colors">
              <Heart size={18} className="group-hover:scale-125 transition-transform" />
              <span className="text-[10px] font-black">1</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="flex w-full border-t border-gray-50 md:hidden bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-[11px] font-black uppercase tracking-tighter text-[#737373]">
          {["Home", "Shop", "About", "Blog", "Contact"].map(item => (
            <Link key={item} to={item === "Shop" ? "/shop" : "/"} className="hover:text-[#23A6F0]">{item}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}