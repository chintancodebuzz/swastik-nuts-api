// routes/admin/subcategory.routes.js
import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory
} from "../../controllers/admin/subCategory.controller.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("admin"), createSubCategory);
router.get("/", getSubCategories);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateSubCategory);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteSubCategory);

export default router;
