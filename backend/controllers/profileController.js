const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name: name.trim(),
        phone
      },
      {
        new: true,
        runValidators: true
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update profile",
      error: error.message
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};