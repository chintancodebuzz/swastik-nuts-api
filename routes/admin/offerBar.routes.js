// routes/admin/offerBar.routes.js
import express from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

import {
  createOfferBar,
  getActiveOfferBars,
  updateOfferBar,
  deleteOfferBar
} from "../../controllers/admin/offerBar.controller.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("admin"), createOfferBar);
router.get("/", getActiveOfferBars); // frontend
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateOfferBar);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteOfferBar);

export default router;
