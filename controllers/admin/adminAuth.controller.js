import jwt from "jsonwebtoken";
import logger from "../../config/logger.js";
import userModel from "../../models/user.model.js";

// JWT generator
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Admin/SubAdmin Registration (only admin can create subadmin)
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["admin","subadmin"].includes(role)) {
      return res.status(400).json({ message: "❌ Invalid role" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email exists" });

    const user = await userModel.create({ name, email, password, role });
    logger.info(`🟢 New ${role} registered: ${email}`);

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    logger.error(`❌ Admin Registration error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Admin/SubAdmin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !["admin","subadmin"].includes(user.role))
      return res.status(404).json({ message: "Admin/SubAdmin not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(user);
    logger.info(`🟢 ${user.role} logged in: ${email}`);

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    logger.error(`❌ Admin Login error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
