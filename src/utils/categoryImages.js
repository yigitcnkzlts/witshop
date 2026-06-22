/** Kategori id → yerel görsel yolu (API/Vercel yedek) */
export const CATEGORY_IMAGES = {
  1: "/categories/kadin-elbise.jpg",
  2: "/categories/kadin-bluz-gomlek.jpg",
  3: "/categories/kadin-pantalon.jpg",
  4: "/categories/kadin-etek.jpg",
  5: "/categories/kadin-canta.jpg",
  6: "/categories/kadin-ayakkabi.jpg",
  7: "/categories/erkek-tshirt.jpg",
  8: "/categories/erkek-gomlek.jpg",
  9: "/categories/erkek-pantalon.jpg",
  10: "/categories/erkek-ceket.jpg",
  11: "/categories/erkek-saat.jpg",
  12: "/categories/erkek-ayakkabi.jpg",
};

export function getCategoryImage(category) {
  if (!category) return CATEGORY_IMAGES[1];
  return category.img || CATEGORY_IMAGES[category.id] || CATEGORY_IMAGES[1];
}

export function enrichCategories(categories = []) {
  return categories.map((cat) => ({
    ...cat,
    img: getCategoryImage(cat),
  }));
}
