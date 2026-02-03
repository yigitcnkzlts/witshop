import { Link } from "react-router-dom";
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
    <header className="flex w-full flex-col">
      {/* TOP BAR */}
      <div className="hidden w-full bg-[#252B42] text-white md:flex">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-xs font-semibold">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>(225) 555-0118</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>michelle.rivera@example.com</span>
            </div>
          </div>

          <span className="hidden lg:block">
            Follow Us and get a chance to win 80% off
          </span>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline">Follow Us :</span>
            <Instagram size={16} />
            <Youtube size={16} />
            <Facebook size={16} />
            <Twitter size={16} />
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="flex w-full bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#252B42]">Bandage</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-5 text-sm font-semibold text-[#737373] md:flex">
            <Link to="/" className="text-[#252B42]">
              Home
            </Link>

            {/* ✅ SHOP MEGA MENU (kaçmayan) */}
            <div className="group relative">
              <Link
                to="/shop"
                className="flex items-center gap-1 transition-colors hover:text-[#252B42]"
                aria-label="Shop"
              >
                Shop <ChevronDown size={16} />
              </Link>

              {/* ✅ Hover bridge: Shop ile panel arasındaki boşluğu kapatır */}
              <div className="invisible absolute left-0 right-0 top-full h-8 group-hover:visible" />

              {/* ✅ Dropdown wrapper (pointer-events yok!) */}
              <div
                className="
                  invisible absolute left-1/2 top-full z-50 mt-2 w-[820px]
                  -translate-x-1/2 translate-y-2 opacity-0
                  transition-all duration-200 ease-out
                  group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                "
              >
                {/* caret */}
                <div className="mx-auto h-3 w-3 rotate-45 bg-white shadow-[0_-1px_0_rgba(0,0,0,0.04)]"></div>

                {/* panel */}
                <div className="rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
                  <div className="grid grid-cols-2 gap-12 px-10 py-10">
                    {/* Kadın */}
                    <div className="pr-6">
                      <div className="mb-5 flex items-center justify-between">
                        <h4 className="text-base font-bold text-[#252B42]">
                          Kadın
                        </h4>
                        <Link
                          to="/shop?cat=kadin"
                          className="text-xs font-semibold text-[#23A6F0] hover:underline"
                        >
                          Tümünü Gör
                        </Link>
                      </div>

                      <ul className="space-y-3 text-sm text-[#737373]">
                        {[
                          ["Tişört", "kadin-tisort"],
                          ["Ayakkabı", "kadin-ayakkabi"],
                          ["Ceket", "kadin-ceket"],
                          ["Elbise", "kadin-elbise"],
                          ["Etek", "kadin-etek"],
                          ["Gömlek", "kadin-gomlek"],
                          ["Kazak", "kadin-kazak"],
                          ["Pantolon", "kadin-pantolon"],
                        ].map(([label, cat]) => (
                          <li key={cat}>
                            <Link
                              to={`/shop?cat=${cat}`}
                              className="inline-flex items-center gap-2 transition-colors hover:text-[#252B42]"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#23A6F0]/40"></span>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Erkek */}
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-0 h-full w-px bg-[#E6E6E6]"></div>

                      <div className="mb-5 flex items-center justify-between">
                        <h4 className="text-base font-bold text-[#252B42]">
                          Erkek
                        </h4>
                        <Link
                          to="/shop?cat=erkek"
                          className="text-xs font-semibold text-[#23A6F0] hover:underline"
                        >
                          Tümünü Gör
                        </Link>
                      </div>

                      <ul className="space-y-3 text-sm text-[#737373]">
                        {[
                          ["Tişört", "erkek-tisort"],
                          ["Ayakkabı", "erkek-ayakkabi"],
                          ["Ceket", "erkek-ceket"],
                          ["Gömlek", "erkek-gomlek"],
                          ["Kazak", "erkek-kazak"],
                          ["Pantolon", "erkek-pantolon"],
                        ].map(([label, cat]) => (
                          <li key={cat}>
                            <Link
                              to={`/shop?cat=${cat}`}
                              className="inline-flex items-center gap-2 transition-colors hover:text-[#252B42]"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-[#23A6F0]/40"></span>
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* bottom strip */}
                  <div className="flex items-center justify-between rounded-b-2xl bg-[#FAFAFA] px-10 py-4 text-xs text-[#737373]">
                    <span>Popüler: Sneakers • Mont • Elbise</span>
                    <Link
                      to="/shop"
                      className="font-semibold text-[#23A6F0] hover:underline"
                    >
                      Shop sayfasına git →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/" className="transition-colors hover:text-[#252B42]">
              About
            </Link>
            <Link to="/" className="transition-colors hover:text-[#252B42]">
              Blog
            </Link>
            <Link to="/" className="transition-colors hover:text-[#252B42]">
              Contact
            </Link>

            <button
              type="button"
              className="flex items-center gap-1 transition-colors hover:text-[#252B42]"
              aria-label="Pages menu"
            >
              Pages <ChevronDown size={16} />
            </button>
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4 text-[#23A6F0]">
            <Link
              to="/"
              className="hidden items-center gap-2 text-sm font-semibold md:flex"
            >
              <User size={16} />
              Login / Register
            </Link>

            <button
              type="button"
              className="flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <button type="button" className="flex items-center gap-2" aria-label="Cart">
              <ShoppingCart size={18} />
              <span className="text-xs font-semibold">1</span>
            </button>

            <button type="button" className="flex items-center gap-2" aria-label="Favorites">
              <Heart size={18} />
              <span className="text-xs font-semibold">1</span>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="flex w-full border-t md:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-sm font-semibold text-[#737373]">
          <Link to="/" className="text-[#252B42]">
            Home
          </Link>
          <Link to="/shop">Shop</Link>
          <Link to="/">About</Link>
          <Link to="/">Blog</Link>
          <Link to="/">Contact</Link>
        </div>
      </div>
    </header>
  );
}
