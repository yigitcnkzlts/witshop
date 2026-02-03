import { Link } from "react-router-dom";


const images = import.meta.glob("../assets/products-shop/*", {
  eager: true,
  import: "default",
});

export default function ShopGridCard({ product }) {
  const imgKey = `../assets/products-shop/${product.image}`;
  const imgSrc = images[imgKey];

  return (
    <Link
      to={`/shop/${product.id}`}
      className="flex w-full flex-col bg-white"
      aria-label={`Go to product ${product.id}`}
    >
      <div className="w-full overflow-hidden bg-[#F5F5F5]">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.title}
            className="h-[300px] w-full object-cover"
          />
        ) : (
          <div className="flex h-[300px] w-full items-center justify-center text-sm font-semibold text-[#737373]">
            Image not found: {product.image}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 px-3 py-5 text-center">
        <h3 className="text-sm font-bold text-[#252B42]">{product.title}</h3>
        <p className="text-xs font-semibold text-[#737373]">
          {product.category}
        </p>

        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-[#BDBDBD] line-through">
            ${product.oldPrice.toFixed(2)}
          </span>
          <span className="text-[#23856D]">${product.price.toFixed(2)}</span>
        </div>

        <div className="mt-1 flex items-center gap-2">
          {product.colors.map((c) => (
            <span
              key={c}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
