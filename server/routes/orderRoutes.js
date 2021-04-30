import express from "express";
const router = express.Router();

import {
  createNewOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

/*
  @routes
    createNewOrder (POST /api/orders)
    getMyOrders (GET /api/orders/myorders)
    getOrderById (GET /api/orders/:id)
    updateOrderToPaid (PUT /api/orders/:id/pay)
*/
router.route("/").post(protect, createNewOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
