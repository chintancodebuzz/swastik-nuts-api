import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// User places order
export const createOrder = async (req, res) => {
  try {
    const { products } = req.body; // [{ product, quantity }]

    if (!products || products.length === 0)
      return res.status(400).json({ message: "No products in order" });

    // Calculate price
    let totalAmount = 0;
    const orderProducts = [];
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ message: "Invalid product" });

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      products: orderProducts,
      totalAmount
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders of logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
