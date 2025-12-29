const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createInterestRequest,
  getBrandInterests,
  updateInterestStatus,
} = require("../controllers/interestController");

// Investor: Create interest request
router.post("/", authMiddleware, createInterestRequest);

// Brand Owner: Get interest requests for their brand
router.get("/brand/:brandId", authMiddleware, getBrandInterests);

// Brand Owner: Update interest status
router.put("/:interestId/status", authMiddleware, updateInterestStatus);

module.exports = router;
