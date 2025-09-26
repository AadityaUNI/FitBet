// controllers/followListController.ts
import { RequestHandler } from "express";
import Follow from "../models/Follow";

function parseLimit(q: any, def = 20, max = 50) {
  const n = Number(q);
  return Number.isFinite(n) ? Math.min(Math.max(1, n), max) : def;
}

// GET /users/:id/followers?limit=20&cursor=<createdAtISO>
export const listFollowers: RequestHandler = async (req, res) => {
  const userId = req.params.id;
  const limit = parseLimit(req.query.limit);
  const cursor = req.query.cursor ? new Date(String(req.query.cursor)) : undefined;

  const query: any = { followee: userId };
  if (cursor && !isNaN(cursor.getTime())) {
    query.createdAt = { $lt: cursor };
  }

  const rows = await Follow.find(query)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .populate("follower", "_id username avatarUrl");

  const nextCursor = rows.length ? rows[rows.length - 1].createdAt.toISOString() : null;

  res.json({
    items: rows.map(r => r.follower),
    nextCursor,
  });
};

// GET /users/:id/following?limit=20&cursor=<createdAtISO>
export const listFollowing: RequestHandler = async (req, res) => {
  const userId = req.params.id;
  const limit = parseLimit(req.query.limit);
  const cursor = req.query.cursor ? new Date(String(req.query.cursor)) : undefined;

  const query: any = { follower: userId };
  if (cursor && !isNaN(cursor.getTime())) {
    query.createdAt = { $lt: cursor };
  }

  const rows = await Follow.find(query)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .populate("followee", "_id username avatarUrl");

  const nextCursor = rows.length ? rows[rows.length - 1].createdAt.toISOString() : null;

  res.json({
    items: rows.map(r => r.followee),
    nextCursor,
  });
};
