import { Link } from "react-router-dom";

import category1 from "../assets/shop/category-1.jpg";
import category2 from "../assets/shop/category-2.jpg";
import category3 from "../assets/shop/category-3.jpg";
import category4 from "../assets/shop/category-4.jpg";
import category5 from "../assets/shop/category-5.jpg";

import ShopGridCard from "../components/ShopGridCard";
import { shopProducts } from "../data/shopProducts";

const categories = [
  { id: 1, title: "CLOTHS", items: 5, image: category1 },
  { id: 2, title: "CLOTHS", items: 5, image: category2 },
  { id: 3, title: "CLOTHS", items: 5, image: category3 },
  { id: 4, title: "CLOTHS", items: 5, image: category4 },
  { id: 5, title: "CLOTHS", items: 5, image: category5 },
];

function CategoryCard({ title, items, image }) {
  return (
    <Link to="/shop" className="group relative h-[223px] w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <p className="text-[11px] font-semibold tracking-widest opacity-90">
          {items} Items
        </p>
        <h3 className="mt-1 text-lg font-bold tracking-[0.25em]">{title}</h3>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  return (
    <div className="w-full bg-white">
      {/* TITLE + BREADCRUMB */}
      <section className="w-full">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold text-[#252B42]">Shop</h1>

          <div className="flex items-center gap-2 text-sm font-semibold">
            <Link to="/" className="text-[#252B42]">
              Home
            </Link>
            <span className="text-[#BDBDBD]">{">"}</span>
            <span className="text-[#BDBDBD]">Shop</span>
          </div>
        </div>

        {/* CATEGORY GRID */}
        <div className="mx-auto w-full max-w-6xl px-4 pb-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <CategoryCard
                key={c.id}
                title={c.title}
                items={c.items}
                image={c.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS / FILTER BAR */}
      <section className="w-full border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-semibold text-[#737373]">
            Showing all 12 results
          </p>

          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold text-[#737373]">Views:</p>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded border border-[#E6E6E6]"
              aria-label="Grid view"
            >
              ▦
            </button>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded border border-[#E6E6E6] text-[#BDBDBD]"
              aria-label="List view"
            >
              ≡
            </button>
          </div>

          <div className="flex items-center gap-4">
            <select
              className="h-11 w-[170px] rounded border border-[#E6E6E6] bg-white px-4 text-sm font-semibold text-[#737373] outline-none"
              defaultValue="Popularity"
              aria-label="Sort"
            >
              <option>Popularity</option>
              <option>Newest</option>
              <option>Price: Low</option>
              <option>Price: High</option>
            </select>

            <button
              type="button"
              className="h-11 rounded bg-[#23A6F0] px-7 text-sm font-semibold text-white"
            >
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID (12) */}
      <section className="w-full">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {shopProducts.map((p) => (
              <ShopGridCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* PAGINATION */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 flex justify-center">
          <div className="flex overflow-hidden rounded border border-[#E6E6E6] text-sm font-semibold">
            <button type="button" className="px-6 py-3 text-[#BDBDBD]">
              First
            </button>

            <button
              type="button"
              className="border-l border-[#E6E6E6] px-5 py-3 text-[#23A6F0]"
            >
              1
            </button>

            <button
              type="button"
              className="border-l border-[#E6E6E6] bg-[#23A6F0] px-5 py-3 text-white"
            >
              2
            </button>

            <button
              type="button"
              className="border-l border-[#E6E6E6] px-5 py-3 text-[#23A6F0]"
            >
              3
            </button>

            <button
              type="button"
              className="border-l border-[#E6E6E6] px-6 py-3 text-[#23A6F0]"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* BRANDS STRIP (6 ITEMS) */}
      <section className="w-full bg-[#FAFAFA]">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10 text-4xl font-extrabold text-[#BDBDBD]">
            <span>hooli</span>
            <span>lyft</span>
            <span>stripe</span>
            <span>aws</span>
            <span>reddit</span>
            <span>github</span>
          </div>
        </div>
      </section>
    </div>
  );
}
