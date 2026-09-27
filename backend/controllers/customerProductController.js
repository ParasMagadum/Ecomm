const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const {
      search = "",
      category,
      minPrice,
      maxPrice,
      sort = "newest"
    } = req.query;

    const filter = {};

    if (search.trim()) {
      filter.name = { $regex: search.trim(), $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const sortOptions = {
      newest: { createdAt: -1 },
      priceLow: { price: 1 },
      priceHigh: { price: -1 },
      name: { name: 1 }
    };

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort(sortOptions[sort] || sortOptions.newest);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid product ID"
    });
  }
};

module.exports = {
  getProducts,
  getProductDetails
};