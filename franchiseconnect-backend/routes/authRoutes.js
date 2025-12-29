const express = require("express");
const router = express.Router();
const { uploadProfilePhoto } = require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  verifyForgotPasswordDetails,
  resetPassword,
} = require("../controllers/authController");

// Multer error handling wrapper
const multerErrorHandler = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File size exceeds 5MB limit" });
    }
    if (err.message.includes("Only")) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(400).json({ message: "File upload error: " + err.message });
  }
  next();
};

router.post("/register", (req, res, next) => {
  uploadProfilePhoto(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File size exceeds 5MB limit" });
      }
      if (err.message && err.message.includes("Only")) {
        return res.status(400).json({ message: err.message });
      }
      return res.status(400).json({ message: "File upload error: " + (err.message || "Unknown error") });
    }
    next();
  });
}, registerUser);

router.post("/login", loginUser);
router.post("/forgot-password/verify", verifyForgotPasswordDetails);
router.post("/reset-password", resetPassword);

module.exports = router;
