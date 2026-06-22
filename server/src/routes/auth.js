import { Router } from "express";
import bcrypt from "bcryptjs";
import { getDb } from "../db/database.js";
import { requireAuth, signToken } from "../middleware/auth.js";

const router = Router();

router.get("/roles", (_req, res) => {
  const db = getDb();
  const roles = db.prepare("SELECT id, name, code FROM roles ORDER BY id").all();
  res.json(roles);
});

router.post("/signup", (req, res) => {
  const { name, email, password, role_id, store } = req.body;

  if (!name || !email || !password || !role_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const result = db
    .prepare(
      "INSERT INTO users (name, email, password_hash, role_id, is_active) VALUES (?, ?, ?, ?, 1)"
    )
    .run(name, email, passwordHash, role_id);

  if (role_id === 2 && store) {
    db.prepare(
      "INSERT INTO stores (user_id, name, phone, tax_no, bank_account) VALUES (?, ?, ?, ?, ?)"
    ).run(
      result.lastInsertRowid,
      store.name,
      store.phone ?? null,
      store.tax_no ?? null,
      store.bank_account ?? null
    );
  }

  res.status(201).json({ message: "User created successfully" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const db = getDb();
  const user = db
    .prepare("SELECT id, name, email, password_hash, role_id, is_active FROM users WHERE email = ?")
    .get(email);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.is_active) {
    return res.status(403).json({ message: "Account not activated" });
  }

  const token = signToken(user.id);
  res.json({
    token,
    name: user.name,
    email: user.email,
    role_id: String(user.role_id),
  });
});

router.get("/verify", requireAuth, (req, res) => {
  const db = getDb();
  const user = db
    .prepare("SELECT name, email, role_id FROM users WHERE id = ?")
    .get(req.userId);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  res.json({
    name: user.name,
    email: user.email,
    role_id: String(user.role_id),
    token: req.token,
  });
});

export default router;
