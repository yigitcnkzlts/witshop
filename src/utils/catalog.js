import api from "../api/api";
import { enrichCategories } from "./categoryImages";

/** Kategorileri kendi backend API'den yukler */
export async function loadCatalogCategories() {
  const response = await api.get("/categories");
  return enrichCategories(response.data);
}

export function isCatalogCategoryId(id) {
  return Number(id) >= 1 && Number(id) <= 12;
}
