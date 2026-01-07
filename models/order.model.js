// models/order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending","confirmed","shipped","delivered","cancelled"],
      default: "pending"
    },
    isPaid: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
