import { useEffect, useState } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

const CATEGORIES_URL = "https://workintech-fe-ecommerce.onrender.com/categories";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(CATEGORIES_URL);
        // img alanı tam URL string olarak gelir; CategoryCard bunu <img src> ile gösterir.
        const data = Array.isArray(response.data) ? response.data : [];

        if (!cancelled) {
          setCategories(data);
        }
      } catch {
        if (!cancelled) {
          setError("Kategoriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#23A6F0]"
          role="status"
          aria-label="Kategoriler yükleniyor"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-10 text-center">
        <p className="text-sm font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-10 text-center">
        <p className="text-sm font-medium text-gray-500">Gösterilecek kategori bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
