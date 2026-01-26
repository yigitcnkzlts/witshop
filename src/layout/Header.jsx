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

          <div className="flex items-center gap-2">
            <span>Follow Us and get a chance to win 80% off</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Follow Us :</span>
            <Instagram size={16} />
            <Youtube size={16} />
            <Facebook size={16} />
            <Twitter size={16} />
          </div>
        </div>
      </div>

      <div className="flex w-full bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#252B42]">Bandage</span>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-semibold text-[#737373] md:flex">
            <Link to="/" className="text-[#252B42]">
              Home
            </Link>

            <button
              type="button"
              className="flex items-center gap-1"
              aria-label="Shop menu"
            >
              Shop <ChevronDown size={16} />
            </button>

            <Link to="/">About</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Contact</Link>

            <button
              type="button"
              className="flex items-center gap-1"
              aria-label="Pages menu"
            >
              Pages <ChevronDown size={16} />
            </button>
          </nav>

          <div className="flex items-center gap-4 text-[#23A6F0]">
            <Link
              to="/"
              className="hidden items-center gap-2 text-sm font-semibold md:flex"
            >
              <User size={16} />
              Login / Register
            </Link>

            <button type="button" className="flex items-center justify-center" aria-label="Search">
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

      <div className="flex w-full border-t md:hidden">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 text-sm font-semibold text-[#737373]">
          <Link to="/" className="text-[#252B42]">
            Home
          </Link>
          <Link to="/">Shop</Link>
          <Link to="/">About</Link>
          <Link to="/">Blog</Link>
          <Link to="/">Contact</Link>
        </div>
      </div>
    </header>
  );
}