const Category = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch category",
      error: error.message,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const cleanName = name.trim();
    const slug = cleanName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const existingCategory = await Category.findOne({
      $or: [{ name: cleanName }, { slug }],
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name: cleanName,
      slug,
      description: description || "",
    });

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add category",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.name) {
      updates.name = updates.name.trim();
      updates.slug = updates.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update category",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};