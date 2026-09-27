const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate(
      "products"
    );

    res.json(wishlist || { user: req.user.id, products: [] });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch wishlist." });
  }
};

const addWishlistItem = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.id,
        products: [productId],
      });
    } else {
      if (wishlist.products.some((id) => id.toString() === productId)) {
        return res.status(200).json({
          message: "Product is already in your wishlist.",
          wishlist,
        });
      }

      wishlist.products.push(productId);
      await wishlist.save();
    }

    await wishlist.populate("products");

    res.status(201).json({
      message: "Product added to wishlist.",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not add product to wishlist." });
  }
};

const removeWishlistItem = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found." });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== req.params.productId
    );

    await wishlist.save();

    res.json({
      message: "Product removed from wishlist.",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not remove product." });
  }
};

module.exports = {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
};