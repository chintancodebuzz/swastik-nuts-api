// models/category.model.js
import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

categorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  // next();
});

export default mongoose.model("Category", categorySchema);
