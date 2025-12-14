// routes/brandRoutes.js
import express from "express";
import { createBrand, listBrands, getBrand, approveBrand } from "../controllers/brandController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("brandowner","admin","superadmin"), upload.single("brandImage"), createBrand);
router.get("/", listBrands);
router.get("/:id", getBrand);
router.put("/:id/approve", protect, authorizeRoles("moderator","admin","superadmin"), approveBrand);

export default router;
