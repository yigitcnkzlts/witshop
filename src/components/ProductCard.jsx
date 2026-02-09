import { Heart } from "lucide-react";

export default function ProductCard({ title, price, image }) {
  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md">
      {/* Görsel Alanı */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 md:aspect-video">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-2 md:object-cover md:p-0 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* İçerik Alanı */}
      <div className="flex flex-1 flex-col justify-between p-3 md:p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm font-medium leading-tight text-gray-800 md:text-base md:font-semibold">
              {title}
            </h3>
            <button 
              className="shrink-0 rounded-full border border-gray-100 p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500 active:scale-90"
              aria-label="Add to favorites"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-base font-bold text-gray-900 md:text-lg">
            ${price}
          </span>
          <button className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80 active:scale-95 md:px-4 md:py-2.5 md:text-sm">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}