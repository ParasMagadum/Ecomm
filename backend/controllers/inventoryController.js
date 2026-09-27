const Product = require("../models/Product");

const getInventory = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .select("name price category stock image");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch inventory",
      error: error.message
    });
  }
};

const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock === undefined || stock < 0) {
      return res.status(400).json({
        message: "Valid stock value is required"
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { stock },
      {
        new: true,
        runValidators: true
      }
    ).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Stock updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update stock",
      error: error.message
    });
  }
};

module.exports = {
  getInventory,
  updateStock
};