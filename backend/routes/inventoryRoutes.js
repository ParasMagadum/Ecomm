const express = require("express");

const {
  getInventory,
  updateStock
} = require("../controllers/inventoryController");

const {
  protect,
  adminOnly
} = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, adminOnly, getInventory);

router.put("/:id", protect, adminOnly, updateStock);

module.exports = router;