import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    variant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant" },
    type: { type: String, enum: ["IN","OUT"], required: true },
    quantity: { type: Number, required: true },
    price: { type: Number },
    reason: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);
