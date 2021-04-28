import express from "express";
const router = express.Router();

import {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middleware/authMiddleware.js";

/*
  @routes
    authenticateUser (POST /api/users/login),
    registerUser (POST /api/users),
    getUserProfile (GET /api/users/profile),
*/
router.post("/login", authenticateUser);
router.route("/").post(registerUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
