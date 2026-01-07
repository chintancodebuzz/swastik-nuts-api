import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        variant: { type: mongoose.Schema.Types.ObjectId, ref: "Variant" },
        quantity: { type: Number, default: 1 },
        price: { type: Number }, // sellPrice
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
