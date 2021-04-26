import express from "express";
const router = express.Router();

import {
  authenticateUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

/*
  @routes
    authenticateUser (POST /api/users/login),
    registerUser (POST /api/users),
    getUserProfile (GET /api/users/profile),
*/
router.post("/login", authenticateUser);
router.route("/").post(registerUser);
router.route("/profile").get(protect, getUserProfile);

export default router;
