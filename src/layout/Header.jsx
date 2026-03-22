import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  LogOut,
} from "lucide-react";
import { logoutUser } from "../store/actions";
import Gravatar from "../components/Gravatar";

export default function Header() {
  const { user } = useSelector(state => state.client);
  const { categories } = useSelector(state => state.product);
  const { cart } = useSelector(state => state.shoppingCart);
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isLoggedIn = user && user.email;
  
  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);

  // Kategorileri cinsiyet bazında grupla
  const womenCategories = categories.filter(cat => 
    cat.gender === 'k' || cat.title?.toLowerCase().includes('kadın')
  ).slice(0, 6);
  
  const menCategories = categories.filter(cat => 
    cat.gender === 'e' || cat.title?.toLowerCase().includes('erkek')
  ).slice(0, 6);
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
                    {/* KADIN KATEGORİSİ */}
                    <div className="rounded-[1.5rem] p-8 transition-colors hover:bg-gray-50/50">
                      <h4 className="mb-6 text-sm font-black tracking-widest text-[#252B42]">
                        KADIN
                      </h4>
                      <div className="space-y-2">
                        {womenCategories.length > 0 ? (
                          womenCategories.map(cat => (
                            <Link 
                              key={cat.id} 
                              to={`/shop/kadin/${cat.title?.toLowerCase().replace(/\s+/g, '-')}/${cat.id}`}
                              className="block text-sm text-gray-700 hover:text-[#23A6F0]"
                            >
                              {cat.title}
                            </Link>
                          ))
                        ) : (
                          <>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Elbise</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Bluz & Gömlek</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Pantolon</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Etek</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Çanta</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Ayakkabı</Link>
                          </>
                        )}
                      </div>
                    </div>

                    {/* ERKEK KATEGORİSİ */}
                    <div className="border-l border-gray-100 bg-gray-50/30 p-8">
                      <h4 className="mb-6 text-sm font-black tracking-widest text-[#252B42]">
                        ERKEK
                      </h4>
                      <div className="space-y-2">
                        {menCategories.length > 0 ? (
                          menCategories.map(cat => (
                            <Link 
                              key={cat.id} 
                              to={`/shop/erkek/${cat.title?.toLowerCase().replace(/\s+/g, '-')}/${cat.id}`}
                              className="block text-sm text-gray-700 hover:text-[#23A6F0]"
                            >
                              {cat.title}
                            </Link>
                          ))
                        ) : (
                          <>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">T-Shirt</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Gömlek</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Pantolon</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Ceket</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Saat</Link>
                            <Link to="/shop" className="block text-sm text-gray-700 hover:text-[#23A6F0]">Ayakkabı</Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#252B42] px-10 py-3 text-[10px] font-bold text-white/70">
                    <span>TRENDING: OVERSIZE TEE • CARGO PANTS • BLAZER</span>
                    <Link
                      to="/shop"
                      className="text-white transition-colors hover:text-[#23A6F0]"
                    >
                      TÜM ÜRÜNLERİ GÖR →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT / BLOG */}
            <Link
              to="/about"
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

            {/* 🔴 T6 – TEAM */}
            <Link
              to="/team"
              className="group relative transition-colors hover:text-[#23A6F0]"
            >
              Team
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
            {isLoggedIn ? (
              <div className="group relative">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Gravatar email={user.email} size={32} />
                  <div className="hidden md:block">
                    <p className="text-xs font-black uppercase text-[#252B42]">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-gray-500">{user.role_id === 1 ? 'Admin' : user.role_id === 2 ? 'Store' : 'Customer'}</p>
                  </div>
                  <ChevronDown size={14} className="text-gray-400" />
                </div>
                
                {/* User Dropdown */}
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-48 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/5">
                    <div className="px-3 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden items-center gap-2 text-xs font-black uppercase transition-opacity hover:opacity-70 md:flex"
              >
                <User size={16} />
                Login / Register
              </Link>
            )}

            <button className="rounded-full p-2 transition-colors hover:bg-blue-50">
              <Search size={18} />
            </button>

            <div className="group relative">
              <Link
                to="/cart"
                className="flex items-center gap-1 rounded-full p-2 transition-colors hover:bg-blue-50"
              >
                <ShoppingCart
                  size={18}
                  className="transition-transform group-hover:rotate-12"
                />
                <span className="text-[10px] font-black">{cartItemCount}</span>
              </Link>
              
              {/* Cart Dropdown */}
              {cart.length > 0 && (
                <div className="invisible absolute right-0 top-full z-50 mt-2 w-80 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5">
                    <h3 className="mb-3 font-semibold text-gray-900">Shopping Cart ({cartItemCount})</h3>
                    <div className="max-h-60 space-y-3 overflow-y-auto">
                      {cart.slice(0, 3).map((item) => (
                        <div key={item.product.id} className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded bg-gray-100">
                            {item.product.images?.[0] ? (
                              <img
                                src={item.product.images[0].url}
                                alt={item.product.name}
                                className="h-full w-full rounded object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                IMG
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {item.product.name || item.product.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {item.count} x ${(item.product.price || 0).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {cart.length > 3 && (
                      <p className="mt-2 text-xs text-gray-500">
                        +{cart.length - 3} more items
                      </p>
                    )}
                    <Link
                      to="/cart"
                      className="mt-3 block w-full rounded bg-[#23A6F0] py-2 text-center text-sm font-medium text-white hover:bg-blue-600"
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
          <Link to="/" className="hover:text-[#23A6F0]">
            Home
          </Link>
          <Link to="/shop" className="hover:text-[#23A6F0]">
            Shop
          </Link>
          <Link to="/about" className="hover:text-[#23A6F0]">
            About
          </Link>
          <Link to="/" className="hover:text-[#23A6F0]">
            Blog
          </Link>
          {/* 🔴 T6 – TEAM */}
          <Link to="/team" className="hover:text-[#23A6F0]">
            Team
          </Link>
          {/* 🔴 T5 – CONTACT */}
          <Link to="/contact" className="hover:text-[#23A6F0]">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
