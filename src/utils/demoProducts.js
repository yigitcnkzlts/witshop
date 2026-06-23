let cachedProducts = null;

export async function loadDemoProducts() {
  if (cachedProducts) return cachedProducts;
  const response = await fetch("/data/demo-products.json");
  if (!response.ok) throw new Error("Demo products not found");
  const data = await response.json();
  cachedProducts = data.products || [];
  return cachedProducts;
}

export function filterDemoProducts(products, { category, filter, sort, limit, offset }) {
  let list = [...products];

  if (category) {
    list = list.filter((p) => p.category_id === Number(category));
  }

  if (filter) {
    const term = filter.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.description || "").toLowerCase().includes(term)
    );
  }

  if (sort === "price:asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price:desc") list.sort((a, b) => b.price - a.price);
  else if (sort === "rating:asc") list.sort((a, b) => a.rating - b.rating);
  else if (sort === "rating:desc") list.sort((a, b) => b.rating - a.rating);

  const total = list.length;
  const slice = list.slice(Number(offset) || 0, (Number(offset) || 0) + (Number(limit) || 25));

  return { total, products: slice };
}

export async function getDemoProductById(id) {
  const products = await loadDemoProducts();
  return products.find((p) => p.id === Number(id)) || null;
}
