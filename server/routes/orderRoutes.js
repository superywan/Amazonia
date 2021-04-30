import express from "express";
const router = express.Router();

import {
  createNewOrder,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

/*
  @routes
    createNewOrder (POST /api/orders)
    getOrderById (GET /api/orders/:id)
*/
router.route("/").post(protect, createNewOrder);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
