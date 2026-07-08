import api from "../api/api";
import { enrichCategories } from "./categoryImages";

let cachedStaticCategories = null;

/** Vercel / statik deploy: public/data/categories.json */
async function loadStaticCategories() {
  if (cachedStaticCategories) return cachedStaticCategories;
  const response = await fetch("/data/categories.json");
  if (!response.ok) throw new Error("Static categories not found");
  const data = await response.json();
  cachedStaticCategories = enrichCategories(Array.isArray(data) ? data : []);
  return cachedStaticCategories;
}

/** Kategorileri backend API'den yukler; API yoksa statik dosyaya duser */
export async function loadCatalogCategories() {
  try {
    const response = await api.get("/categories", { timeout: 5000 });
    return enrichCategories(response.data);
  } catch {
    console.warn("API unavailable, using static categories");
    return loadStaticCategories();
  }
}

export function isCatalogCategoryId(id) {
  return Number(id) >= 1 && Number(id) <= 12;
}
