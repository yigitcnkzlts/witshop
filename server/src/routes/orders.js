import { Router } from "express";
import { getDb } from "../db/database.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/order", requireAuth, (req, res) => {
  const db = getDb();
  const orders = db
    .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC")
    .all(req.userId);

  const getItems = db.prepare(
    "SELECT product_id, count, detail FROM order_items WHERE order_id = ?"
  );

  const result = orders.map((order) => ({
    id: order.id,
    user_id: order.user_id,
    address_id: order.address_id,
    order_date: order.order_date,
    price: order.price,
    products: getItems.all(order.id).map((item) => ({
      product_id: item.product_id,
      count: item.count,
      detail: item.detail,
    })),
  }));

  res.json(result);
});

router.post("/order", requireAuth, (req, res) => {
  const {
    address_id,
    order_date,
    card_no,
    card_name,
    card_expire_month,
    card_expire_year,
    card_ccv,
    price,
    products = [],
  } = req.body;

  const db = getDb();

  const address = db
    .prepare("SELECT id FROM addresses WHERE id = ? AND user_id = ?")
    .get(address_id, req.userId);

  if (!address) {
    return res.status(400).json({ message: "Invalid address" });
  }

  const insertOrder = db.prepare(`
    INSERT INTO orders (user_id, address_id, order_date, price, card_no, card_name, card_expire_month, card_expire_year, card_ccv)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertItem = db.prepare(`
    INSERT INTO order_items (order_id, product_id, count, detail)
    VALUES (?, ?, ?, ?)
  `);

  const updateStock = db.prepare(`
    UPDATE products
    SET sell_count = sell_count + ?,
        stock = CASE WHEN stock - ? < 0 THEN 0 ELSE stock - ? END
    WHERE id = ?
  `);

  const result = insertOrder.run(
    req.userId,
    address_id,
    order_date ?? new Date().toISOString(),
    price,
    String(card_no),
    card_name,
    card_expire_month,
    card_expire_year,
    card_ccv
  );

  const orderId = result.lastInsertRowid;

  for (const item of products) {
    insertItem.run(orderId, item.product_id, item.count, item.detail ?? "");
    updateStock.run(item.count, item.count, item.count, item.product_id);
  }

  res.status(201).json({
    id: orderId,
    user_id: req.userId,
    address_id,
    order_date: order_date ?? new Date().toISOString(),
    price,
    products,
  });
});

export default router;
