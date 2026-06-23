import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ShopGridCard from "../components/ShopGridCard";
import FavoriteButton from "../components/FavoriteButton";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites.list);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#252B42]">Favorilerim</h1>
            <p className="mt-1 text-sm text-gray-500">
              {favorites.length} ürün favorilerinizde
            </p>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold text-[#23A6F0] hover:underline"
          >
            Alışverişe devam et →
          </Link>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-700">
              Henüz favori ürününüz yok
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Ürünlerdeki kalp ikonuna tıklayarak favorilere ekleyebilirsiniz.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-xl bg-[#23A6F0] px-6 py-3 text-sm font-bold text-white hover:bg-blue-600"
            >
              Shop&apos;a Git
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <div key={product.id} className="relative">
                <div className="absolute right-2 top-2 z-10">
                  <FavoriteButton product={product} />
                </div>
                <ShopGridCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
