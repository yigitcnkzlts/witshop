import axios from "axios";

export const WORKINTECH_API = "https://workintech-fe-ecommerce.onrender.com";

const OWN_API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3001" : "https://witshop-api.onrender.com");

const api = axios.create({
  baseURL: OWN_API,
  timeout: 12000,
});

export const fallbackApi = axios.create({
  baseURL: WORKINTECH_API,
  timeout: 20000,
});

/** Witshop kategori id → Workintech kategori id (yedek API için) */
export const WITSHOP_TO_WORKINTECH_CATEGORY = {
  1: 4,
  2: 1,
  3: 8,
  4: 5,
  6: 2,
  7: 14,
  8: 11,
  9: 13,
  10: 10,
  12: 9,
};

export async function getWithFallback(path) {
  try {
    return await api.get(path);
  } catch (primaryError) {
    console.warn("Primary API unavailable, using Workintech fallback:", path);
    return await fallbackApi.get(path);
  }
}

export async function loadStaticCategories() {
  const response = await fetch("/data/categories.json");
  if (!response.ok) throw new Error("Static categories not found");
  return response.json();
}

export default api;
