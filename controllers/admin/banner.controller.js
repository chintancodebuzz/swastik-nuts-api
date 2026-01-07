// controllers/admin/banner.controller.js
import Banner from "../../models/banner.model.js";
import path from "path";

export const createBanner = async (req, res) => {
  try {
    const { title, subtitle, link, order } = req.body;
    if (!req.file)
      return res.status(400).json({ message: "Banner image required" });

    const banner = await Banner.create({
      title,
      subtitle,
      link,
      order,
      image: req.file.filename,
    });

    res.status(201).json({ success: true, data: banner });
  } catch (error) {
    console.error("❌ createBanner:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });

    // prepend public path
    const result = banners.map((b) => ({
      ...b.toObject(),
      image: `/uploads/${b.image}`,
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("❌ getBanners:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    const { title, subtitle, link, order, isActive } = req.body;

    if (title) banner.title = title;
    if (subtitle) banner.subtitle = subtitle;
    if (link) banner.link = link;
    if (order !== undefined) banner.order = order;
    if (isActive !== undefined) banner.isActive = isActive;

    if (req.file) {
      banner.image = req.file.filename;
    }
    await banner.save();
    res.json({ success: true, data: banner });
  } catch (error) {
    console.error("❌ updateBanner:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    await banner.deleteOne();
    res.json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.error("❌ deleteBanner:", error);
    res.status(500).json({ message: "Server error" });
  }
};
