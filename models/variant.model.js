import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    weightInGrams: { type: Number, required: true }, // 250, 500, 1000
    buyPrice: { type: Number, required: true },
    sellPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Variant", variantSchema);
