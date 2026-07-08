import axios from "axios";

const DEFAULT_PROD_API = "https://witshop-api.onrender.com";

/** Kendi Witshop backend API (yerel veya Render) */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:3001" : DEFAULT_PROD_API);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: import.meta.env.DEV ? 20000 : 5000,
});

export function syncAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = token;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function apiGet(path, config) {
  return api.get(path, config);
}

export async function apiPost(path, data, config) {
  return api.post(path, data, config);
}

export async function apiPut(path, data, config) {
  return api.put(path, data, config);
}

export async function apiDelete(path, config) {
  return api.delete(path, config);
}

export default api;
