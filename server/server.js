import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// Access to .env file
dotenv.config();

const app = express();

// Access to req.body
app.use(express.json());

// Connecting to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Product Routes
app.use("/api/products", productRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Route to Access PAYPAL_CLIENT_ID enviorment variable
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${listener.address().port}`.yellow.bold);
});
