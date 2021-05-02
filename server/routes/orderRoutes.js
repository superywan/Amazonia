import express from "express";
const router = express.Router();

import {
  createNewOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from "../controllers/orderControllers.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

/*
  @routes
    createNewOrder (POST /api/orders)
    getMyOrders (GET /api/orders/myorders)
    getOrderById (GET /api/orders/:id)
    updateOrderToPaid (PUT /api/orders/:id/pay)
    updateOrderToDelivered (PUT /api/orders/:id/deliver);
*/
router
  .route("/")
  .post(protect, createNewOrder)
  .get(protect, checkAdmin, getOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, checkAdmin, updateOrderToDelivered);
router.route("/myorders").get(protect, getMyOrders);

export default router;
