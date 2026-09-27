const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId });
  }

  return cart;
};

const getCart = async (req, res) => {
  try {
    const cart = await getOrCreateCart(req.user.id);

    const items = await CartItem.find({ cart: cart._id })
      .populate("product", "name image price stock category");

    const validItems = items.filter((item) => item.product);

    const total = validItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    res.status(200).json({
      cartId: cart._id,
      items: validItems,
      total
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cart",
      error: error.message
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const requestedQuantity = Number(quantity);

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < requestedQuantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const cart = await getOrCreateCart(req.user.id);

    let item = await CartItem.findOne({
      cart: cart._id,
      product: productId
    });

    const newQuantity = item
      ? item.quantity + requestedQuantity
      : requestedQuantity;

    if (newQuantity > product.stock) {
      return res.status(400).json({
        message: "Requested quantity exceeds available stock"
      });
    }

    if (item) {
      item.quantity = newQuantity;
      await item.save();
    } else {
      item = await CartItem.create({
        cart: cart._id,
        product: productId,
        quantity: requestedQuantity
      });
    }

    res.status(201).json({
      message: "Product added to cart",
      item
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product to cart",
      error: error.message
    });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const quantity = Number(req.body.quantity);

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1"
      });
    }

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = await CartItem.findOne({
      _id: req.params.itemId,
      cart: cart._id
    }).populate("product");

    if (!item || !item.product) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity > item.product.stock) {
      return res.status(400).json({
        message: "Requested quantity exceeds available stock"
      });
    }

    item.quantity = quantity;
    await item.save();

    res.status(200).json({
      message: "Cart quantity updated",
      item
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update cart item",
      error: error.message
    });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = await CartItem.findOneAndDelete({
      _id: req.params.itemId,
      cart: cart._id
    });

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to remove item",
      error: error.message
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      await CartItem.deleteMany({ cart: cart._id });
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to clear cart",
      error: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};