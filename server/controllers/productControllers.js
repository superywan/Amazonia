import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/*
 @desc Get All Products
 @route GET /api/products
 @access PUBLIC
*/
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

/*
 @desc Get Product By Id
 @route GET /api/products/:id
 @access PUBLIC
*/
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
