import { Router } from "express";
import { getDb, rowToAddress, rowToCard } from "../db/database.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// --- Addresses ---

router.get("/user/address", requireAuth, (req, res) => {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM addresses WHERE user_id = ? ORDER BY id")
    .all(req.userId);
  res.json(rows.map(rowToAddress));
});

router.post("/user/address", requireAuth, (req, res) => {
  const { title, name, surname, phone, city, district, neighborhood } = req.body;
  const db = getDb();

  const result = db
    .prepare(`
      INSERT INTO addresses (user_id, title, name, surname, phone, city, district, neighborhood, address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      req.userId,
      title,
      name,
      surname,
      phone,
      city,
      district,
      neighborhood,
      neighborhood
    );

  const row = db.prepare("SELECT * FROM addresses WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(rowToAddress(row));
});

router.put("/user/address", requireAuth, (req, res) => {
  const { id, title, name, surname, phone, city, district, neighborhood } = req.body;
  const db = getDb();

  const existing = db
    .prepare("SELECT id FROM addresses WHERE id = ? AND user_id = ?")
    .get(id, req.userId);

  if (!existing) {
    return res.status(404).json({ message: "Address not found" });
  }

  db.prepare(`
    UPDATE addresses
    SET title = ?, name = ?, surname = ?, phone = ?, city = ?, district = ?, neighborhood = ?, address = ?
    WHERE id = ? AND user_id = ?
  `).run(title, name, surname, phone, city, district, neighborhood, neighborhood, id, req.userId);

  const row = db.prepare("SELECT * FROM addresses WHERE id = ?").get(id);
  res.json(rowToAddress(row));
});

router.delete("/user/address/:id", requireAuth, (req, res) => {
  const db = getDb();
  const result = db
    .prepare("DELETE FROM addresses WHERE id = ? AND user_id = ?")
    .run(req.params.id, req.userId);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Address not found" });
  }

  res.status(204).send();
});

// --- Cards ---

router.get("/user/card", requireAuth, (req, res) => {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM cards WHERE user_id = ? ORDER BY id")
    .all(req.userId);
  res.json(rows.map(rowToCard));
});

router.post("/user/card", requireAuth, (req, res) => {
  const {
    card_no,
    expire_month,
    expire_year,
    name_on_card,
    cvv,
    installment = 1,
    use_3d_secure = true,
  } = req.body;

  const db = getDb();
  const result = db
    .prepare(`
      INSERT INTO cards (user_id, card_no, expire_month, expire_year, name_on_card, cvv, installment, use_3d_secure)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      req.userId,
      card_no,
      expire_month,
      expire_year,
      name_on_card,
      cvv ?? null,
      installment,
      use_3d_secure ? 1 : 0
    );

  const row = db.prepare("SELECT * FROM cards WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(rowToCard(row));
});

router.put("/user/card", requireAuth, (req, res) => {
  const {
    id,
    card_no,
    expire_month,
    expire_year,
    name_on_card,
    cvv,
    installment = 1,
    use_3d_secure = true,
  } = req.body;

  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM cards WHERE id = ? AND user_id = ?")
    .get(id, req.userId);

  if (!existing) {
    return res.status(404).json({ message: "Card not found" });
  }

  db.prepare(`
    UPDATE cards
    SET card_no = ?, expire_month = ?, expire_year = ?, name_on_card = ?, cvv = ?, installment = ?, use_3d_secure = ?
    WHERE id = ? AND user_id = ?
  `).run(
    card_no,
    expire_month,
    expire_year,
    name_on_card,
    cvv ?? null,
    installment,
    use_3d_secure ? 1 : 0,
    id,
    req.userId
  );

  const row = db.prepare("SELECT * FROM cards WHERE id = ?").get(id);
  res.json(rowToCard(row));
});

router.delete("/user/card/:id", requireAuth, (req, res) => {
  const db = getDb();
  const result = db
    .prepare("DELETE FROM cards WHERE id = ? AND user_id = ?")
    .run(req.params.id, req.userId);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Card not found" });
  }

  res.status(204).send();
});

export default router;
