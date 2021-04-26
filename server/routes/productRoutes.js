import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Product from "../models/productModel.js";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

/*
 @desc Get All Products
 @route GET /api/products
 @access PUBLIC
*/
router.get("/", getProducts);

/*
 @desc Get Product By Id
 @route GET /api/products/:id
 @access PUBLIC
*/
router.get("/:id", getProductById);

export default router;
