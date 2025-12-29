const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { uploadProfilePhoto } = require("../middleware/uploadMiddleware");

const {
  getUserProfile,
  updateUserProfile,
  getUserBrands,
  getProfilePhoto,
  getUserCount,
} = require("../controllers/userController");

// Public route for user count
router.get("/count", getUserCount);

// Protected routes
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, uploadProfilePhoto, updateUserProfile);
router.get("/brands", authMiddleware, getUserBrands);
router.get("/profile-photo/:userId", getProfilePhoto);

module.exports = router;
