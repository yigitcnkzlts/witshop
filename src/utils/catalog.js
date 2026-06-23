import { loadStaticCategories } from "../api/api";
import { enrichCategories } from "./categoryImages";
import { loadDemoProducts } from "./demoProducts";

/** Bandage katalogu: 12 kategori + gorsel + urun sayisi (Vercel icin tek kaynak) */
export async function loadCatalogCategories() {
  const [categories, demoProducts] = await Promise.all([
    loadStaticCategories(),
    loadDemoProducts().catch(() => []),
  ]);

  const counts = {};
  for (const product of demoProducts) {
    counts[product.category_id] = (counts[product.category_id] || 0) + 1;
  }

  return enrichCategories(categories).map((cat) => ({
    ...cat,
    items: counts[cat.id] || 4,
  }));
}

export function isCatalogCategoryId(id) {
  return Number(id) >= 1 && Number(id) <= 12;
}
