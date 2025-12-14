import express from "express";
import { createReport, listReports } from "../controllers/reportController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { ROLES } from "../config/roles.js";

const router = express.Router();
router.post("/", protect, createReport);
router.get("/", protect, authorizeRoles(ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPERADMIN), listReports);
export default router;
