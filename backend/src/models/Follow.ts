// models/Follow.ts
import { Schema, model, Types } from "mongoose";

const FollowSchema = new Schema({
  follower: { type: Schema.Types.ObjectId, ref: "Account", required: true, index: true },
  followee: { type: Schema.Types.ObjectId, ref: "Account", required: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

// Prevent duplicates (one user can’t follow the same person twice)
FollowSchema.index({ follower: 1, followee: 1 }, { unique: true });

export default model("Follow", FollowSchema);
