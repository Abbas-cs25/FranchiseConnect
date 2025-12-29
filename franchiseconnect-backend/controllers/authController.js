const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    console.log("Register request received");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    
    const {
      firstName,
      middleName,
      lastName,
      gender,
      dob,
      state,
      city,
      pinCode,
      address,
      qualification,
      occupation,
      mobile,
      email,
      password,
      confirmPassword,
    } = req.body;

    // Validate inputs
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dob ||
      !state ||
      !city ||
      !pinCode ||
      !address ||
      !qualification ||
      !occupation ||
      !mobile ||
      !email ||
      !password
    ) {
      console.log("Validation failed - missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      console.log("Password mismatch:", password, "vs", confirmPassword);
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: existingUser.email === email ? "Email already registered" : "Mobile already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle file upload
    let profilePhoto = null;
    if (req.file) {
      profilePhoto = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const user = new User({
      firstName,
      middleName,
      lastName,
      gender,
      dob: new Date(dob),
      state,
      city,
      pinCode,
      address,
      qualification,
      occupation,
      mobile,
      email,
      password: hashedPassword,
      profilePhoto,
      isVerified: true,
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "franchise_secret", {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    console.log("Login request received");
    const { email, password } = req.body;
    console.log("Email:", email, "Password provided:", !!password);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Password invalid for user:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || "franchise_secret", {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};

// FORGOT PASSWORD - Verify Details
exports.verifyForgotPasswordDetails = async (req, res) => {
  try {
    const { email, gender, dob, state, city, pinCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify all details match
    const userDob = new Date(user.dob).toISOString().split("T")[0];
    const providedDob = new Date(dob).toISOString().split("T")[0];

    if (
      user.gender !== gender ||
      userDob !== providedDob ||
      user.state !== state ||
      user.city !== city ||
      user.pinCode !== pinCode
    ) {
      return res.status(400).json({ message: "Details do not match" });
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "franchise_secret", {
      expiresIn: "30m",
    });

    res.status(200).json({
      message: "Verification successful",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Verify token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET || "franchise_secret");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
