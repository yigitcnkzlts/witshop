import { DatabaseSync } from "node:sqlite";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "../../data");
const DB_PATH = join(DATA_DIR, "witshop.db");
const SEED_PATH = join(__dirname, "../../seed-data.json");

let db;

export function getDb() {
  if (!db) {
    mkdirSync(DATA_DIR, { recursive: true });
    db = new DatabaseSync(DB_PATH);
    db.exec("PRAGMA foreign_keys = ON");
    initSchema(db);
    seedIfEmpty(db);
    syncCategoriesFromSeed(db);
  }
  return db;
}

function initSchema(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role_id INTEGER NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    );

    CREATE TABLE IF NOT EXISTS stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL UNIQUE,
      name TEXT NOT NULL,
      phone TEXT,
      tax_no TEXT,
      bank_account TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY,
      code TEXT,
      title TEXT NOT NULL,
      img TEXT,
      rating REAL DEFAULT 0,
      gender TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      store_id INTEGER,
      category_id INTEGER,
      rating REAL DEFAULT 0,
      sell_count INTEGER DEFAULT 0,
      images_json TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT,
      name TEXT,
      surname TEXT,
      phone TEXT,
      city TEXT,
      district TEXT,
      neighborhood TEXT,
      address TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      card_no TEXT NOT NULL,
      expire_month INTEGER,
      expire_year INTEGER,
      name_on_card TEXT,
      cvv TEXT,
      installment INTEGER DEFAULT 1,
      use_3d_secure INTEGER DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      address_id INTEGER,
      order_date TEXT,
      price REAL,
      card_no TEXT,
      card_name TEXT,
      card_expire_month INTEGER,
      card_expire_year INTEGER,
      card_ccv INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      count INTEGER NOT NULL,
      detail TEXT,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
  `);
}

function seedIfEmpty(database) {
  const roleCount = database.prepare("SELECT COUNT(*) AS c FROM roles").get().c;
  if (roleCount > 0) return;

  const insertRole = database.prepare(
    "INSERT INTO roles (id, name, code) VALUES (?, ?, ?)"
  );
  const roles = [
    [1, "admin", "admin"],
    [2, "store", "store"],
    [3, "customer", "customer"],
  ];
  for (const role of roles) insertRole.run(...role);

  const passwordHash = bcrypt.hashSync("123456", 10);
  database
    .prepare(
      "INSERT INTO users (name, email, password_hash, role_id, is_active) VALUES (?, ?, ?, ?, 1)"
    )
    .run("Cust Omer", "customer@commerce.com", passwordHash, 3);

  if (existsSync(SEED_PATH)) {
    const seed = JSON.parse(readFileSync(SEED_PATH, "utf-8"));

    const insertCat = database.prepare(
      "INSERT INTO categories (id, code, title, img, rating, gender) VALUES (?, ?, ?, ?, ?, ?)"
    );
    for (const cat of seed.categories || []) {
      insertCat.run(
        cat.id,
        cat.code ?? null,
        cat.title,
        cat.img ?? null,
        cat.rating ?? 0,
        cat.gender ?? null
      );
    }

    const insertProduct = database.prepare(`
      INSERT INTO products (id, name, description, price, stock, store_id, category_id, rating, sell_count, images_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const p of seed.products || []) {
      insertProduct.run(
        p.id,
        p.name,
        p.description ?? "",
        p.price,
        p.stock ?? 0,
        p.store_id ?? null,
        p.category_id ?? null,
        p.rating ?? 0,
        p.sell_count ?? 0,
        JSON.stringify(p.images ?? [])
      );
    }
  }
}

function syncCategoriesFromSeed(database) {
  if (!existsSync(SEED_PATH)) return;

  const seed = JSON.parse(readFileSync(SEED_PATH, "utf-8"));
  const update = database.prepare(`
    UPDATE categories
    SET code = ?, title = ?, img = ?, rating = ?, gender = ?
    WHERE id = ?
  `);

  for (const cat of seed.categories || []) {
    update.run(
      cat.code ?? null,
      cat.title,
      cat.img ?? null,
      cat.rating ?? 0,
      cat.gender ?? null,
      cat.id
    );
  }
}

export function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    stock: row.stock,
    store_id: row.store_id,
    category_id: row.category_id,
    rating: row.rating,
    sell_count: row.sell_count,
    images: JSON.parse(row.images_json || "[]"),
  };
}

export function rowToAddress(row) {
  return {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    name: row.name,
    surname: row.surname,
    phone: row.phone,
    city: row.city,
    district: row.district,
    neighborhood: row.neighborhood,
    address: row.address ?? row.neighborhood,
  };
}

export function rowToCard(row) {
  return {
    id: row.id,
    card_no: row.card_no,
    expire_month: row.expire_month,
    expire_year: row.expire_year,
    name_on_card: row.name_on_card,
    installment: row.installment,
    use_3d_secure: Boolean(row.use_3d_secure),
  };
}
