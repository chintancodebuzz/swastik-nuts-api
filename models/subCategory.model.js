// models/subCategory.model.js
import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

subCategorySchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
  // next();
});

export default mongoose.model("SubCategory", subCategorySchema);
