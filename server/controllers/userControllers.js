import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

/*
 @desc Authenticate User and Get User Info with Token
 @route POST /api/users/login
 @access PUBLIC
*/
export const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.isPwdMatch(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("Invalid Email or Password");
  }
});

/*
 @desc Register New User
 @route POST /api/users
 @access PUBLIC
*/
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExists = await User.findOne({ email: email });

  if (isUserExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const newUser = await User.create({ name, email, password });

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

/*
 @desc Get User's Profile
 @route GET /api/users/profile
 @access PRIVATE 
*/
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

/*
 @desc Update User's Profile
 @route PUT /api/users/profile
 @access PRIVATE 
*/
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUserProfile = await user.save();
    res.json({
      _id: updatedUserProfile._id,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      isAdmin: updatedUserProfile.isAdmin,
      token: generateToken(updatedUserProfile._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

/*
 @desc Get All Users
 @route GET /api/users
 @access PRIVATE ADMIN
*/
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/*
 @desc Get User By Id 
 @route GET /api/users/:id
 @access PRIVATE ADMIN
*/
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

/*
 @desc Delete User
 @route DELETE /api/users/:id
 @access PRIVATE ADMIN
*/
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Successfully Deleted" });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

/*
 @desc Update User
 @route PUT /api/users/:id
 @access PRIVATE ADMIN
*/
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
