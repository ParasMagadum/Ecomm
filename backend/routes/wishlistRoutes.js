const express = require("express");
const router = express.Router();

const {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/auth");

router.get("/", protect, getWishlist);
router.post("/", protect, addWishlistItem);
router.delete("/:productId", protect, removeWishlistItem);

module.exports = router;