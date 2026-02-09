import { Link } from "react-router-dom";

const images = import.meta.glob("../assets/products-shop/*", {
  eager: true,
  import: "default",
});

export default function ShopGridCard({ product }) {
  const imgKey = `../assets/products-shop/${product.image}`;
  const imgSrc = images[imgKey];
  
  // İndirim oranını hesapla (Opsiyonel görsel şölen için)
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <Link
      to={`/shop/${product.id}`}
      className="group relative flex w-full flex-col bg-white transition-all duration-500 hover:-translate-y-3"
    >
      {/* Görsel Alanı */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F5F5F5] shadow-sm transition-all duration-500 group-hover:shadow-2xl md:h-[300px]">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-[#737373]">
            Image not found
          </div>
        )}

        {/* İndirim Etiketi (Badge) */}
        {discount > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-[10px] font-black text-white shadow-lg">
            %{discount} OFF
          </div>
        )}

        {/* Görsel altı yumuşak karartma (Yazıların kopmaması için) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* İçerik Alanı */}
      <div className="flex flex-col items-center gap-2 px-2 py-6 text-center">
        <h3 className="line-clamp-1 text-sm font-black uppercase tracking-tighter text-[#252B42] md:text-base">
          {product.title}
        </h3>
        
        <p className="text-[11px] font-bold tracking-widest text-[#737373] uppercase opacity-70">
          {product.category}
        </p>

        <div className="mt-1 flex items-center justify-center gap-3 font-black">
          <span className="text-xs text-[#BDBDBD] line-through decoration-red-400/50">
            ${product.oldPrice.toFixed(2)}
          </span>
          <span className="text-base text-[#23856D] md:text-lg">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Renk Seçenekleri */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {product.colors.map((c) => (
            <span
              key={c}
              className="h-3 w-3 rounded-full border-2 border-white ring-1 ring-gray-200 transition-all duration-300 hover:scale-150 hover:ring-[#23A6F0]"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}