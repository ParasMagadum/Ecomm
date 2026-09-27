const mongoose = require("mongoose");

const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

// POST /api/orders
// Place order using Cash on Delivery
const createOrder = async (req, res) => {
  try {
    const { shipping_address } = req.body;

    if (!shipping_address || !shipping_address.trim()) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    const cartItems = await CartItem.find({ cart: cart._id }).populate(
      "product"
    );

    if (!cartItems.length) {
      return res.status(400).json({
        message: "Your cart is empty",
      });
    }

    let total = 0;

    for (const item of cartItems) {
      if (!item.product) {
        return res.status(400).json({
          message: "A product in your cart no longer exists",
        });
      }

      if (item.quantity > item.product.stock) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}`,
        });
      }

      total += item.product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user.id,
      total,
      status: "Pending",
      shipping_address: shipping_address.trim(),
    });

    for (const item of cartItems) {
      const updatedProduct = await Product.findOneAndUpdate(
        {
          _id: item.product._id,
          stock: { $gte: item.quantity },
        },
        {
          $inc: { stock: -item.quantity },
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.product.name}. Please review your cart.`,
        });
      }

      await OrderItem.create({
        order: order._id,
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      });
    }

    await CartItem.deleteMany({ cart: cart._id });

    return res.status(201).json({
      message: "Order placed successfully. Payment method: Cash on Delivery.",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
};

// GET /api/orders/my
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ order_date: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// GET /api/orders/:id
const getMyOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const order = await Order.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const items = await OrderItem.find({ order: order._id }).populate(
      "product",
      "name image"
    );

    return res.status(200).json({
      order,
      items,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getMyOrderDetails,
};