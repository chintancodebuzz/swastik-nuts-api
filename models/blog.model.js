// models/blog.model.js
import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    image: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Generate slug from title
blogSchema.pre("save", function () {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true });
  }
});

export default mongoose.model("Blog", blogSchema);
