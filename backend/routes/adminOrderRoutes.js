const express = require("express");
const { getAllOrders, updateOrderStatus } = require("../controllers/adminOrderController");
const { protect, adminOnly } = require("../middleware/auth");
const router = express.Router();
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);
module.exports = router;
