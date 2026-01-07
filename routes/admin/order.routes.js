import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { createOrder, getOrders, getMyOrders } from "../controllers/order.controller.js";

const router = express.Router();

// User creates order
router.post("/", authMiddleware, createOrder);

// User gets own orders
router.get("/my-orders", authMiddleware, getMyOrders);

// Admin gets all orders
router.get("/", authMiddleware, authorizeRoles("admin"), getOrders);

export default router;
