const mongoose = require("mongoose");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ order_date: -1 });
    const result = await Promise.all(orders.map(async (order) => {
      const items = await OrderItem.find({ order: order._id }).populate("product", "name image");
      return { ...order.toObject(), items };
    }));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch admin orders", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const allowed = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    ).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
};

module.exports = { getAllOrders, updateOrderStatus };
