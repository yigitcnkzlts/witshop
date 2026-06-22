import { Router } from "express";
import { getDb, rowToProduct } from "../db/database.js";

const router = Router();

router.get("/categories", (_req, res) => {
  const db = getDb();
  const categories = db
    .prepare("SELECT id, code, title, img, rating, gender FROM categories ORDER BY id")
    .all();
  res.json(categories);
});

router.get("/products", (req, res) => {
  const db = getDb();
  const limit = Math.max(1, parseInt(req.query.limit, 10) || 25);
  const offset = Math.max(0, parseInt(req.query.offset, 10) || 0);
  const category = req.query.category;
  const filter = req.query.filter;
  const sort = req.query.sort;

  let where = "WHERE 1=1";
  const params = [];

  if (category) {
    where += " AND category_id = ?";
    params.push(parseInt(category, 10));
  }

  if (filter) {
    where += " AND (name LIKE ? OR description LIKE ?)";
    const term = `%${filter}%`;
    params.push(term, term);
  }

  let orderBy = "ORDER BY id ASC";
  if (sort === "price:asc") orderBy = "ORDER BY price ASC";
  else if (sort === "price:desc") orderBy = "ORDER BY price DESC";
  else if (sort === "rating:asc") orderBy = "ORDER BY rating ASC";
  else if (sort === "rating:desc") orderBy = "ORDER BY rating DESC";

  const total = db
    .prepare(`SELECT COUNT(*) AS c FROM products ${where}`)
    .get(...params).c;

  const rows = db
    .prepare(`SELECT * FROM products ${where} ${orderBy} LIMIT ? OFFSET ?`)
    .all(...params, limit, offset);

  res.json({
    total,
    products: rows.map(rowToProduct),
  });
});

router.get("/products/:id", (req, res) => {
  const db = getDb();
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);

  if (!row) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(rowToProduct(row));
});

export default router;
