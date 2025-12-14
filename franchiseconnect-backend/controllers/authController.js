// controllers/authController.js
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Register user
// @route POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) { res.status(400); throw new Error("All fields required"); }
  const exists = await User.findOne({ email });
  if (exists) { res.status(400); throw new Error("User already exists"); }
  const user = await User.create({ name, email, password, role });
  res.status(201).json({
    _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id)
  });
});

// @desc Login user
// @route POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
  } else {
    res.status(401); throw new Error("Invalid email or password");
  }
});
