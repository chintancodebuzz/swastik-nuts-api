import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🚀 ~ authMiddleware ~ token:", token)

  if (!token) {
    return res.status(401).json({ message: "❌ No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id, role }
    console.log("🚀 ~ authMiddleware ~ req.user:", req.user)
    next();
  } catch (error) {
    return res.status(401).json({ message: "❌ Invalid token" });
  }
};

export default authMiddleware;
