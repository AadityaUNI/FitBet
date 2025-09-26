// controllers/userController.ts
import { RequestHandler } from "express";
import Account from "../models/Account";
import Follow from "../models/Follow";
import mongoose from "mongoose";

export const searchUsers: RequestHandler = async (req, res) => {
  const q = String(req.query.q ?? "").trim();
  if (!q) return res.json({ results: [] });

  // Simple regex search; for production consider autocomplete indexes or Atlas Search
  const candidates = await Account.find({
    username: { $regex: q, $options: "i" },
  })
    .select("_id username avatarUrl followersCount followingCount")
    .limit(20);

  const me = (req as any).userId;
  // Mark whether you already follow each candidate
  const mapIds = candidates.map(u => u._id);
  const edges = me
    ? await Follow.find({ follower: me, followee: { $in: mapIds } }).select("followee")
    : [];

  const followedSet = new Set(edges.map(e => String(e.followee)));

  res.json({
    results: candidates.map(u => ({
      _id: u._id,
      username: u.username,
      avatarUrl: u.avatarUrl,
      followersCount: u.followersCount,
      followingCount: u.followingCount,
      isFollowedByMe: me ? followedSet.has(String(u._id)) : false,
    })),
  });
};
