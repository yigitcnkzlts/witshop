import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toggleFavorite } from "../store/actions";
import clsx from "clsx";

export default function FavoriteButton({
  product,
  size = 18,
  className = "",
  showLabel = false,
}) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.list);
  const isFavorite = product?.id
    ? favorites.some((p) => p.id === product.id)
    : false;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product?.id) return;

    dispatch(toggleFavorite(product));
    toast.success(
      isFavorite ? "Favorilerden çıkarıldı" : "Favorilere eklendi"
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
      aria-pressed={isFavorite}
      className={clsx(
        "flex items-center justify-center rounded-full border transition-all active:scale-90",
        isFavorite
          ? "border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
          : "border-gray-100 bg-white/90 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500",
        showLabel ? "gap-2 px-3 py-2" : "p-2",
        className
      )}
    >
      <Heart size={size} className={isFavorite ? "fill-current" : ""} />
      {showLabel && (
        <span className="text-xs font-semibold">
          {isFavorite ? "Favoride" : "Favorile"}
        </span>
      )}
    </button>
  );
}
