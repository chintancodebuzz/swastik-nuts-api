// routes/admin/faq.routes.js
import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import {
  createFAQ,
  getFAQs,
  updateFAQ,
  deleteFAQ
} from "../../controllers/admin/faq.controller.js";

const router = express.Router();

// CRUD routes
router.post("/", authMiddleware, authorizeRoles("admin"), createFAQ);
router.get("/", getFAQs); // frontend can use GET
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateFAQ);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteFAQ);

export default router;
