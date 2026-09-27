const express = require("express");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const {
  protect,
  adminOnly
} = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);

router.get("/:id", protect, adminOnly, getUser);

router.put("/:id", protect, adminOnly, updateUser);

router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;