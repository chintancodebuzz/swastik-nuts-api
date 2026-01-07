// controllers/admin/subCategory.controller.js
import SubCategory from "../../models/subCategory.model.js";
import Category from "../../models/category.model.js";

export const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "SubCategory name is required" });
    }

    if (!category) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subCategory = await SubCategory.create({
      name: name.trim(),
      category,
    });

    res.status(201).json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    console.error("❌ createSubCategory:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.aggregate([
      {
        $lookup: {
          from: "categories", // MongoDB collection name
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $project: {
          name: 1,
          slug: 1,
          isActive: 1,
          createdAt: 1,
          updatedAt: 1,
          "category._id": 1,
          "category.name": 1,
          "category.slug": 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    res.json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateSubCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "SubCategory name is required" });
    }

    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    subCategory.name = name.trim();
    await subCategory.save();

    res.json({
      success: true,
      data: subCategory,
    });
  } catch (error) {
    console.error("❌ updateSubCategory:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);

    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }

    await subCategory.deleteOne();

    res.json({
      success: true,
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    console.error("❌ deleteSubCategory:", error);
    res.status(500).json({ message: "Server error" });
  }
};
