import axios from "axios";

const PROD_API_URL = "https://witshop-api.onrender.com";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? "http://localhost:3001" : PROD_API_URL),
});

export default api;