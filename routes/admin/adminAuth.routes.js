import express from "express";
import { registerAdmin, loginAdmin } from "../../controllers/admin/adminAuth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

// Only Admin can create new admin/subadmin
router.post("/register", authMiddleware, authorizeRoles("admin"), registerAdmin);

// Login for Admin/SubAdmin
router.post("/login", loginAdmin);

export default router;
