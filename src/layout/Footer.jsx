import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-4">
        {/* Üst satır */}
        <div className="flex flex-col items-start justify-between gap-6 border-b py-10 md:flex-row md:items-center">
          <h3 className="text-2xl font-bold text-[#252B42]">Bandage</h3>

          <div className="flex items-center gap-4 text-xl text-[#23A6F0]">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

        {/* Link kolonları */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-5">
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#252B42]">Company Info</h4>
            <span className="text-sm text-[#737373]">About Us</span>
            <span className="text-sm text-[#737373]">Carrier</span>
            <span className="text-sm text-[#737373]">We are hiring</span>
            <span className="text-sm text-[#737373]">Blog</span>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#252B42]">Legal</h4>
            <span className="text-sm text-[#737373]">About Us</span>
            <span className="text-sm text-[#737373]">Carrier</span>
            <span className="text-sm text-[#737373]">We are hiring</span>
            <span className="text-sm text-[#737373]">Blog</span>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#252B42]">Features</h4>
            <span className="text-sm text-[#737373]">Business Marketing</span>
            <span className="text-sm text-[#737373]">User Analytic</span>
            <span className="text-sm text-[#737373]">Live Chat</span>
            <span className="text-sm text-[#737373]">Unlimited Support</span>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#252B42]">Resources</h4>
            <span className="text-sm text-[#737373]">IOS & Android</span>
            <span className="text-sm text-[#737373]">Watch a Demo</span>
            <span className="text-sm text-[#737373]">Customers</span>
            <span className="text-sm text-[#737373]">API</span>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#252B42]">Get In Touch</h4>
            <div className="flex overflow-hidden rounded border">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 text-sm outline-none"
              />
              <button className="bg-[#23A6F0] px-5 py-3 text-sm font-semibold text-white">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-[#737373]">Lore imp sum dolor Amit</p>
          </div>
        </div>
      </div>

      {/* En alt bar */}
      <div className="bg-[#FAFAFA] py-6">
  <p className="text-center text-sm font-semibold text-[#737373]">
    © {new Date().getFullYear()} WITShop. Made with ❤️ by Yiğit Can. All rights reserved.
  </p>
</div>

    </footer>
  );
}