import express from "express";
import userAuthRoutes from "./users/auth.routes.js";
import adminAuthRoutes from "./admin/adminAuth.routes.js";
import adminCategoryRoutes from "./admin/category.routes.js";
import adminSubcategoryRoutes from "./admin/subcategory.routes.js";
import offerBarRoutes from "./admin/offerBar.routes.js";
import faqRoutes from "./admin/faq.routes.js";
import bannerRoutes from "./admin/banner.routes.js";
import productRoutes from "./admin/product.routes.js";
import blogRoutes from "./admin/blog.routes.js";

const router = express.Router();

router.use("/user/auth", userAuthRoutes);
router.use("/admin/auth", adminAuthRoutes);
router.use("/admin/category", adminCategoryRoutes);
router.use("/admin/subcategory", adminSubcategoryRoutes);
router.use("/offer-bar", offerBarRoutes);
router.use("/faq", faqRoutes);
router.use("/banner", bannerRoutes);
router.use("/admin/product", productRoutes);
router.use("/blog", blogRoutes);

export default router;
