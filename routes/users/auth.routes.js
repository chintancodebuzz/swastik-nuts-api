import express from "express";
import { loginUser, registerUser } from "../../controllers/users/auth.controller.js";


const router = express.Router();

// POST /api/user/register
router.post("/register", registerUser);

// POST /api/user/login
router.post("/login", loginUser);

export default router;
