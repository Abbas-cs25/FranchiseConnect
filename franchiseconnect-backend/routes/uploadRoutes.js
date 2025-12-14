// routes/uploadRoutes.js
import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { uploadImage, getImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/photo", protect, upload.single("image"), uploadImage); // returns fileId
router.get("/:id", getImage); // public stream

export default router;
