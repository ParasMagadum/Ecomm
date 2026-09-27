const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect, adminOnly } = require("../middleware/auth");

router.get("/", protect, adminOnly, getCategories);
router.get("/:id", protect, adminOnly, getCategory);

router.post("/", protect, adminOnly, addCategory);
router.put("/:id", protect, adminOnly, updateCategory);
router.delete("/:id", protect, adminOnly, deleteCategory);

module.exports = router;