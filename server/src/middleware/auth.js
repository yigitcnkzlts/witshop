import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "witshop-dev-secret";

export function signToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.startsWith("Bearer ") ? header.slice(7) : header;

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    req.token = token;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export { JWT_SECRET };
