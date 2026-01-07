import jwt from "jsonwebtoken";
import logger from "../../config/logger.js";
import userModel from "../../models/user.model.js";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      logger.error(`❌ Registration failed: Email already exists`);
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await userModel.create({ name, email, password, role });
    logger.info(`🟢 New user registered: ${user.email}`);

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
    logger.error(`❌ Registration error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      logger.error(`❌ Login failed: User not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.error(`❌ Login failed: Invalid password for ${email}`);
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);
    logger.info(`🟢 User logged in: ${email}`);

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
    logger.error(`❌ Login error: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
