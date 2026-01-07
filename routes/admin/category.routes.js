// routes/admin/category.routes.js
import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../../controllers/admin/category.controller.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("admin"), createCategory);
router.get("/", getCategories);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateCategory);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteCategory);

export default router;
