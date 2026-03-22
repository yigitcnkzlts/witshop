import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { addToCart } from "../store/actions";

const images = import.meta.glob("../assets/products-shop/*", {
  eager: true,
  import: "default",
});

export default function ShopGridCard({ product }) {
  const dispatch = useDispatch();
  const imgKey = `../assets/products-shop/${product.image}`;
  const imgSrc = images[imgKey];
  
  // İndirim oranını hesapla (Opsiyonel görsel şölen için)
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name || product.title} added to cart!`);
  };

  // Create product URL slug
  const createProductUrl = () => {
    if (product.category_id && product.name) {
      // For API products with full data
      const gender = 'unisex'; // Default, could be determined from category
      const categoryName = 'product';
      const productSlug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      return `/shop/${gender}/${categoryName}/${product.category_id}/${productSlug}/${product.id}`;
    } else {
      // For local products (fallback)
      return `/shop/${product.id}`;
    }
  };

  return (
    <Link
      to={createProductUrl()}
      className="group relative flex w-full flex-col bg-white transition-all duration-500 hover:-translate-y-3 cursor-pointer"
    >
      {/* Görsel Alanı */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#F5F5F5] shadow-sm transition-all duration-500 group-hover:shadow-2xl md:h-[300px]">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.title || product.name}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        ) : product.images && product.images[0] ? (
          <img
            src={product.images[0].url}
            alt={product.title || product.name}
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

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Add to Cart Button - Appears on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-lg bg-[#23A6F0] px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-blue-600"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>

      {/* İçerik Alanı */}
      <div className="flex flex-col items-center gap-2 px-2 py-6 text-center">
        <h3 className="line-clamp-1 text-sm font-black uppercase tracking-tighter text-[#252B42] md:text-base">
          {product.title || product.name}
        </h3>
        
        <p className="text-[11px] font-bold tracking-widest text-[#737373] uppercase opacity-70">
          {product.category}
        </p>

        <div className="mt-1 flex items-center justify-center gap-3 font-black">
          {product.oldPrice && (
            <span className="text-xs text-[#BDBDBD] line-through decoration-red-400/50">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-base text-[#23856D] md:text-lg">
            ${(product.price || 0).toFixed(2)}
          </span>
        </div>

        {/* Renk Seçenekleri */}
        {product.colors && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {product.colors.map((c, index) => (
              <span
                key={index}
                className="h-3 w-3 rounded-full border-2 border-white ring-1 ring-gray-200 transition-all duration-300 hover:scale-150 hover:ring-[#23A6F0]"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}