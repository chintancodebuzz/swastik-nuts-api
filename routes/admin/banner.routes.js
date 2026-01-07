// routes/admin/banner.routes.js
import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { uploadBanner } from "../../middleware/upload.middleware.js";

import {
  createBanner,
  getBanners,
  updateBanner,
  deleteBanner
} from "../../controllers/admin/banner.controller.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("admin"), uploadBanner.single("image"), createBanner);
router.get("/", getBanners); // frontend
router.put("/:id", authMiddleware, authorizeRoles("admin"), uploadBanner.single("image"), updateBanner);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteBanner);

export default router;
