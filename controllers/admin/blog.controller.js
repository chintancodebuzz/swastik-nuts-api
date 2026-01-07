// controllers/admin/blog.controller.js
import Blog from "../../models/blog.model.js";

// Create Blog
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title and content required" });

    const blogData = { title, content };
    if (req.file) blogData.image = req.file.filename;

    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const { title, content, isActive } = req.body;
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (isActive !== undefined) blog.isActive = isActive;
    if (req.file) blog.image = req.file.filename;

    await blog.save();
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await blog.deleteOne();
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
