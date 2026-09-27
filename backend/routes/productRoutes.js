const express = require("express");

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const {
  protect,
  adminOnly
} = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, adminOnly, getProducts);
router.get("/:id", protect, adminOnly, getProduct);
router.post("/", protect, adminOnly, addProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;