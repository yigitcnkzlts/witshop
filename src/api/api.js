import axios from "axios";

export const WORKINTECH_API = "https://workintech-fe-ecommerce.onrender.com";

/** Yerelde kendi backend; Vercel'de dogrudan Workintech (witshop-api deploy edilmedi) */
export const OWN_API =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3001" : WORKINTECH_API);

const api = axios.create({
  baseURL: OWN_API,
  timeout: 20000,
});

export const fallbackApi = axios.create({
  baseURL: WORKINTECH_API,
  timeout: 20000,
});

let fallbackActivated = false;

export function isFallbackActive() {
  return fallbackActivated || api.defaults.baseURL === WORKINTECH_API;
}

export function activateFallback() {
  if (isFallbackActive()) return;
  console.warn("Primary API unavailable, switching to Workintech");
  api.defaults.baseURL = WORKINTECH_API;
  const token = api.defaults.headers.common.Authorization;
  if (token) {
    fallbackApi.defaults.headers.common.Authorization = token;
  }
  fallbackActivated = true;
}

function useLocalBackendOnly() {
  return import.meta.env.DEV && String(OWN_API).includes("localhost");
}

async function withFallback(primary, fallback) {
  try {
    return await primary();
  } catch (primaryError) {
    if (useLocalBackendOnly()) {
      throw primaryError;
    }
    console.warn("API request failed, retrying with Workintech fallback");
    activateFallback();
    return await fallback();
  }
}

/** Witshop kategori id → Workintech kategori id */
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

export async function getWithFallback(path, config) {
  return withFallback(
    () => api.get(path, config),
    () => fallbackApi.get(path, config)
  );
}

export async function postWithFallback(path, data, config) {
  return withFallback(
    () => api.post(path, data, config),
    () => fallbackApi.post(path, data, config)
  );
}

export async function putWithFallback(path, data, config) {
  return withFallback(
    () => api.put(path, data, config),
    () => fallbackApi.put(path, data, config)
  );
}

export async function deleteWithFallback(path, config) {
  return withFallback(
    () => api.delete(path, config),
    () => fallbackApi.delete(path, config)
  );
}

export function syncAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = token;
    fallbackApi.defaults.headers.common.Authorization = token;
  } else {
    delete api.defaults.headers.common.Authorization;
    delete fallbackApi.defaults.headers.common.Authorization;
  }
}

export async function loadStaticCategories() {
  const response = await fetch("/data/categories.json");
  if (!response.ok) throw new Error("Static categories not found");
  return response.json();
}

export default api;
