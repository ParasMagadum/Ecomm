const express = require("express");

const {
  getReturns,
  approveReturn,
  rejectReturn
} = require("../controllers/returnController");

const {
  protect,
  adminOnly
} = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, adminOnly, getReturns);

router.put(
  "/:id/approve",
  protect,
  adminOnly,
  approveReturn
);

router.put(
  "/:id/reject",
  protect,
  adminOnly,
  rejectReturn
);

module.exports = router;