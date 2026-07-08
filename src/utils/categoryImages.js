/** Kategori id → görsel URL (Vercel/statik deploy icin harici kaynak) */
export const CATEGORY_IMAGES = {
  1: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  2: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80",
  3: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80",
  4: "https://images.unsplash.com/photo-1583498273704-9450b543e0a1?w=600&q=80",
  5: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
  6: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
  7: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
  8: "https://images.unsplash.com/photo-1596755094514-f87e34085b56?w=600&q=80",
  9: "https://images.unsplash.com/photo-1473966968600-fa801b279a0a?w=600&q=80",
  10: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  11: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
  12: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
};

function isBrokenLocalCategoryPath(img) {
  return typeof img === "string" && img.startsWith("/categories/");
}

export function getCategoryImage(category) {
  if (!category) return CATEGORY_IMAGES[1];
  if (CATEGORY_IMAGES[category.id]) return CATEGORY_IMAGES[category.id];
  if (category.img && !isBrokenLocalCategoryPath(category.img)) return category.img;
  return CATEGORY_IMAGES[1];
}

export function enrichCategories(categories = []) {
  return categories.map((cat) => ({
    ...cat,
    img: getCategoryImage(cat),
  }));
}
