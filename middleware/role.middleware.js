export const authorizeRoles = (...roles) => {
  console.log("🚀 authorizeRoles roles:", roles);

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "❌ Access denied" });
    }

    console.log("✅ Role authorized:", req.user.role);
    next();
  };
};
