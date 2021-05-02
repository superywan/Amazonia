import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import { checkAdmin, protect } from "../middleware/authMiddleware.js";

/*
  @routes 
    getProducts (GET /api/products),
    getProductById (GET /api/products/:id),
    createProduct (POST /api/products),
    updateProduct (PUT /api/products/:id),
    deleteProduct (DELETE /api/products/:id),
*/
router.route("/").get(getProducts).post(protect, checkAdmin, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, checkAdmin, updateProduct)
  .delete(protect, checkAdmin, deleteProduct);

export default router;
