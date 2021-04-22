import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();

import Product from "../models/productModel.js";

// Get All Products (GET /api/products)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Get Product By Id (GET /api/products/:id)
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.json(product);
  })
);

export default router;
