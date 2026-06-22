import express from "express";
import cors from "cors";
import { getDb } from "./db/database.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/orders.js";

const PORT = process.env.PORT || 3001;

getDb();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(authRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Witshop API running at http://localhost:${PORT}`);
});
