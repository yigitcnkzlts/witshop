import { Link, useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { toast } from "react-toastify";

import { shopProducts } from "../data/shopProducts";
import ShopGridCard from "../components/ShopGridCard";
import { fetchProductDetail, addToCart } from "../store/actions";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { productDetail, fetchState } = useSelector(state => state.product);
  const id = Number(productId);

  const [tab, setTab] = useState("description");

  useEffect(() => {
    // Fetch product detail from API
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  // Fallback to local data if API product not found
  const localProduct = useMemo(
    () => shopProducts.find((p) => p.id === id),
    [id]
  );

  const product = productDetail || localProduct;

  // Basit "related" örneği (4 adet)
  const related = useMemo(() => {
    const others = shopProducts.filter((p) => p.id !== id);
    return others.slice(0, 4);
  }, [id]);

  if (fetchState === "FETCHING") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#23A6F0]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold text-[#252B42]">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block font-semibold text-[#23A6F0]">
          Back to Shop →
        </Link>
      </div>
    );
  }

  // Görsel yolu: API'den gelen ürün için images array, local için assets
  const getImageSrc = () => {
    if (product.images && product.images[0]) {
      return product.images[0].url;
    }
    return `/src/assets/products-shop/${product.image}`;
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name || product.title} added to cart!`);
  };

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-6">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
            <Link to="/" className="text-[#252B42]">
              Home
            </Link>
            <span className="text-[#BDBDBD]">{">"}</span>
            <Link to="/shop" className="text-[#252B42]">
              Shop
            </Link>
            <span className="text-[#BDBDBD]">{">"}</span>
            <span className="text-[#BDBDBD]">{product.title}</span>
          </div>
        </div>
      </section>

      {/* TOP: Image + Info */}
      <section className="w-full bg-[#FAFAFA]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {/* Left: Image */}
            <div className="rounded-[2rem] p-8 transition-colors hover:bg-gray-50/50">
              <div className="overflow-hidden rounded bg-white">
                <img
                  src={getImageSrc()}
                  alt={product.title || product.name}
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 mt-4">
                {product.images ? (
                  product.images.slice(0, 2).map((img, index) => (
                    <button key={index} className={`h-20 w-20 overflow-hidden rounded bg-white ${index === 0 ? 'ring-2 ring-[#23A6F0]' : ''}`}>
                      <img
                        src={img.url}
                        alt="thumb"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))
                ) : (
                  <>
                    <button className="h-20 w-20 overflow-hidden rounded bg-white ring-2 ring-[#23A6F0]">
                      <img
                        src={getImageSrc()}
                        alt="thumb"
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <button className="h-20 w-20 overflow-hidden rounded bg-white">
                      <img
                        src={getImageSrc()}
                        alt="thumb"
                        className="h-full w-full object-cover opacity-80"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-bold text-[#252B42] md:text-3xl">
                {product.title || product.name}
              </h1>

              <p className="text-sm font-semibold text-[#737373]">
                {product.category}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex text-[#F3CD03]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating || 4) ? "text-[#F3CD03]" : "text-[#BDBDBD]"}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#737373]">
                  {product.sell_count || 10} Reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 text-lg font-semibold">
                {product.oldPrice && (
                  <span className="text-[#BDBDBD] line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-[#23856D]">${(product.price || 0).toFixed(2)}</span>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="text-[#737373]">Availability :</span>
                <span className="text-[#23A6F0]">
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'In Stock'}
                </span>
              </div>

              <p className="text-sm leading-6 text-[#737373]">
                {product.description || "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met."}
              </p>

              <div className="h-px w-full bg-[#E6E6E6]" />

              {/* Colors */}
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="h-8 w-8 rounded-full border border-white shadow"
                    style={{ backgroundColor: c }}
                    aria-label="color"
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="h-11 rounded bg-[#23A6F0] px-8 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded border border-[#E6E6E6] bg-white"
                  aria-label="favorite"
                >
                  <Heart size={18} className="text-[#252B42]" />
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded border border-[#E6E6E6] bg-white"
                  aria-label="cart"
                >
                  <ShoppingCart size={18} className="text-[#252B42]" />
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded border border-[#E6E6E6] bg-white"
                  aria-label="preview"
                >
                  <Eye size={18} className="text-[#252B42]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 border-b border-[#E6E6E6] pb-4 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setTab("description")}
              className={tab === "description" ? "text-[#252B42]" : "text-[#737373]"}
            >
              Description
            </button>

            <button
              type="button"
              onClick={() => setTab("additional")}
              className={tab === "additional" ? "text-[#252B42]" : "text-[#737373]"}
            >
              Additional Information
            </button>

            <button
              type="button"
              onClick={() => setTab("reviews")}
              className={tab === "reviews" ? "text-[#252B42]" : "text-[#737373]"}
            >
              Reviews (0)
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-3">
            {/* Left content */}
            <div className="md:col-span-2">
              {tab === "description" && (
                <div className="space-y-4 text-sm leading-6 text-[#737373]">
                  <h3 className="text-base font-bold text-[#252B42]">
                    the quick fox jumps over
                  </h3>
                  <p>
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met
                    sent. RELIT official consequent door ENIM RELIT Mollie.
                    Excitation venial consequent sent nostrum met.
                  </p>
                  <p>
                    Met minim Mollie non desert Alamo est sit cliquey dolor do met
                    sent. RELIT official consequent door ENIM RELIT Mollie.
                    Excitation venial consequent sent nostrum met.
                  </p>
                </div>
              )}

              {tab === "additional" && (
                <div className="space-y-3 text-sm text-[#737373]">
                  <p><span className="font-semibold text-[#252B42]">Material:</span> Cotton</p>
                  <p><span className="font-semibold text-[#252B42]">Fit:</span> Regular</p>
                  <p><span className="font-semibold text-[#252B42]">Care:</span> Machine wash</p>
                </div>
              )}

              {tab === "reviews" && (
                <div className="text-sm text-[#737373]">
                  No reviews yet.
                </div>
              )}
            </div>

            {/* Right small list */}
            <div className="space-y-3 text-sm font-semibold text-[#737373]">
              <p className="text-base font-bold text-[#252B42]">the quick fox jumps over</p>
              <ul className="space-y-2">
                <li>✔ the quick fox jumps over the lazy dog</li>
                <li>✔ the quick fox jumps over the lazy dog</li>
                <li>✔ the quick fox jumps over the lazy dog</li>
                <li>✔ the quick fox jumps over the lazy dog</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          <h2 className="mb-8 text-xl font-bold text-[#252B42]">
            BESTSELLER PRODUCTS
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ShopGridCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands strip (same style as Shop bottom) */}
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
