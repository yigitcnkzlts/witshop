export function categorySlug(title = "") {
  return title
    .toLowerCase()
    .replace(/&/g, "ve")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryShopPath(category) {
  const gender = category.gender === "k" ? "kadin" : "erkek";
  return `/shop/${gender}/${categorySlug(category.title)}/${category.id}`;
}
