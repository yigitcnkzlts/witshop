import FavoriteButton from "./FavoriteButton";

export default function ProductCard({ title, price, image, product }) {
  const cardProduct = product || {
    id: `home-${title}`,
    name: title,
    title,
    price: Number(String(price).replace(/[^0-9.]/g, "")) || 0,
    images: image ? [{ url: image }] : [],
  };

  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 md:aspect-video">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105 md:object-cover md:p-0"
        />
        <div className="absolute right-2 top-2">
          <FavoriteButton product={cardProduct} className="shadow-sm" />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-3 md:p-4">
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-sm font-medium leading-tight text-gray-800 md:text-base md:font-semibold">
            {title}
          </h3>
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
