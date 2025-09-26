// controllers/followController.ts
import { RequestHandler } from "express";
import mongoose from "mongoose";
import Account from "../models/Account";
import Follow from "../models/Follow";

export const followUser: RequestHandler = async (req, res) => {
  const me = (req as any).userId as string;
  const targetId = req.params.targetId;

  if (!mongoose.isValidObjectId(targetId)) {
    return res.status(400).json({ message: "Invalid target id" });
  }
  if (me === targetId) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  // Ensure target exists
  const target = await Account.findById(targetId).select("_id");
  if (!target) return res.status(404).json({ message: "User not found" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Try to create the follow edge
    await Follow.create([{ follower: me, followee: targetId }], { session });

    // Only if insertion succeeded, bump counters
    await Account.bulkWrite([
      { updateOne: { filter: { _id: me }, update: { $inc: { followingCount: 1 } } } },
      { updateOne: { filter: { _id: targetId }, update: { $inc: { followersCount: 1 } } } },
    ], { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ message: "Followed" });
  } catch (err: any) {
    await session.abortTransaction().catch(() => {});
    session.endSession();

    // Duplicate follow -> no-op
    if (err?.code === 11000) {
      return res.status(200).json({ message: "Already following" });
    }
    return res.status(500).json({ message: "Failed to follow", error: String(err) });
  }
};

export const unfollowUser: RequestHandler = async (req, res) => {
    const me = (req as any).userId as string;
    const targetId = req.params.targetId;
  
    if (!mongoose.isValidObjectId(targetId)) {
      return res.status(400).json({ message: "Invalid target id" });
    }
    if (me === targetId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const del = await Follow.deleteOne({ follower: me, followee: targetId }, { session });
  
      if (del.deletedCount === 0) {
        await session.abortTransaction();
        session.endSession();
        return res.status(200).json({ message: "Not following" });
      }
  
      await Account.bulkWrite([
        { updateOne: { filter: { _id: me }, update: { $inc: { followingCount: -1 } } } },
        { updateOne: { filter: { _id: targetId }, update: { $inc: { followersCount: -1 } } } },
      ], { session });
  
      await session.commitTransaction();
      session.endSession();
  
      return res.json({ message: "Unfollowed" });
    } catch (err) {
      await session.abortTransaction().catch(() => {});
      session.endSession();
      return res.status(500).json({ message: "Failed to unfollow" });
    }
  };
  