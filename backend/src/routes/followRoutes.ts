// routes/followRoutes.ts
import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { followUser, unfollowUser } from "../controllers/followController";
// import { unfollowUser } from "../controllers/followController";
import { listFollowers, listFollowing } from "../controllers/followListController";
import { searchUsers } from "../controllers/userController";

const router = Router();

router.get("/users/search", requireAuth, searchUsers);

router.post("/follows/:targetId", requireAuth, followUser);
router.delete("/follows/:targetId", requireAuth, unfollowUser);

router.get("/users/:id/followers", requireAuth, listFollowers);
router.get("/users/:id/following", requireAuth, listFollowing);

export default router;
