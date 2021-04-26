import express from "express";
const router = express.Router();

import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

/*
  @routes 
    getProducts (GET /api/products),
    getProductById (GET /api/products/:id),
*/
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
