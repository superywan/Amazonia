import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((item) => item._id == id);
  res.json(product);
});

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${listener.address().port}`);
});