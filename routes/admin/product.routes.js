import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { uploadBanner } from "../../middleware/upload.middleware.js"; // reuse multer for multiple images

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../../controllers/admin/product.controller.js";

const router = express.Router();

// CRUD (admin only)
router.post("/", authMiddleware, authorizeRoles("admin"), uploadBanner.array("images", 5), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, authorizeRoles("admin"), uploadBanner.array("images", 5), updateProduct);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteProduct);

export default router;
