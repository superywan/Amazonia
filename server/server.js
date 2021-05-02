import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { RSA_NO_PADDING } from "constants";

// Access to .env file
dotenv.config();

// Initalizing Application
const app = express();

// Access to req.body
app.use(express.json());

// Connecting to MongoDB
connectDB();

// Route to Access PAYPAL_CLIENT_ID enviorment variable
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Products Routes
app.use("/api/products", productRoutes);

// Users Routes
app.use("/api/users", userRoutes);

// Orders Routes
app.use("/api/orders", orderRoutes);

// Upload Image Route for Creating New Product
app.use("/api/upload", uploadRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("THIS IS API FOR AMAZON CLONE APPLICATION");
  });
}

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening on port ${listener.address().port}`.yellow.bold);
});
