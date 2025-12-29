const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { uploadBrandFiles } = require("../middleware/uploadMiddleware");

const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
  searchBrands,
  getBrandCount,
} = require("../controllers/brandController");

// Public routes
router.get("/count", getBrandCount);
router.get("/search", searchBrands);
router.get("/", getAllBrands);
router.get("/:id", getBrandById);

// Protected routes (Brand Owner only)
router.post("/", authMiddleware, uploadBrandFiles, createBrand);
router.put("/:id", authMiddleware, uploadBrandFiles, updateBrand);
router.delete("/:id", authMiddleware, deleteBrand);

module.exports = router;
