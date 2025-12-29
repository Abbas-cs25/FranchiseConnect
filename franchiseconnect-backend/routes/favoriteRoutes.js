const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addFavorite,
  getFavorites,
  removeFavorite,
  isFavorited,
} = require("../controllers/favoriteController");

// Protected routes
router.post("/", authMiddleware, addFavorite);
router.get("/", authMiddleware, getFavorites);
router.delete("/:brandId", authMiddleware, removeFavorite);
router.get("/:brandId/check", authMiddleware, isFavorited);

module.exports = router;
