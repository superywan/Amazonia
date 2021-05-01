import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;

  if (auth && auth.startsWith("Bearer")) {
    try {
      token = auth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized : Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized : No Token");
  }
});

export const checkAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized : Not an Admin");
  }
};
