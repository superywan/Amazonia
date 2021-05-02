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
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

/*
 @desc Create Product
 @route POST /api/products
 @access PRIVATE/ADMIN
*/
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Default Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Default Brand",
    category: "Default Category",
    countInStock: 0,
    numReviews: 0,
    description: "Default Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/*
 @desc Update Product By Id
 @route PUT /api/products/:id
 @access PRIVATE/ADMIN
*/
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

/*
 @desc Delete a Product
 @route DELETE /api/products/:id
 @access PRIVATE/ADMIN
*/
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Successfully Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
