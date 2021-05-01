import express from "express";
const router = express.Router();

import {
  authenticateUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { protect, checkAdmin } from "../middleware/authMiddleware.js";

/*
  @routes
    registerUser (POST /api/users),
    getUsers (GET /api/users),
    authenticateUser (POST /api/users/login),
    getUserProfile (GET /api/users/profile),
    updateUserProfile (PUT /api/users/profile),
    getUserById (GET /api/users/:id),
    updateUser (PUT /api/users/:id),
    deleteUser (DELETE /api/users/:id)
*/
router.route("/").post(registerUser).get(protect, checkAdmin, getUsers);
router.post("/login", authenticateUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, checkAdmin, getUserById)
  .put(protect, checkAdmin, updateUser)
  .delete(protect, checkAdmin, deleteUser);

export default router;
