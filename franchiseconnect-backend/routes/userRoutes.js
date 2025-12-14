import express from "express";
import { getProfile, updateProfile, listUsers } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { ROLES } from "../config/roles.js";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authUser } from "../controllers/userController.js";

const router = express.Router();
router.post("/login", authUser);
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.get("/", protect, authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN), listUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;
