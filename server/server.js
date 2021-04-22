import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Product Routes
app.use("/api/products", productRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${listener.address().port}`.yellow.bold);
});
