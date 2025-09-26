// middleware/auth.ts
import { RequestHandler } from "express";
import jwt from "../utils/jwt"; // your existing helper

export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = jwt.verify(token); // must return { sub: userId } or similar
    (req as any).userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
