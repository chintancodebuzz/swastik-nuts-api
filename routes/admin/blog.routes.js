// routes/admin/blog.routes.js
import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { uploadBanner } from "../../middleware/upload.middleware.js";

import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../../controllers/admin/blog.controller.js";

const router = express.Router();
// Admin only
router.post("/", authMiddleware, authorizeRoles("admin"), uploadBanner.single("image"), createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", authMiddleware, authorizeRoles("admin"), uploadBanner.single("image"), updateBlog);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteBlog);

export default router;



