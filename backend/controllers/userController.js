const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
      error: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, phone, role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (role !== undefined) {
      if (!["user", "admin"].includes(role)) {
        return res.status(400).json({
          message: "Invalid role"
        });
      }

      user.role = role;
    }

    await user.save();

    const updatedUser = await User.findById(user._id)
      .select("-password");

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update user",
      error: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message
    });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser
};