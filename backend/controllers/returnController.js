const Return = require("../models/Return");

const getReturns = async (req, res) => {
  try {
    const returns = await Return.find()
      .populate("user", "name email phone")
      .populate("order")
      .sort({ request_date: -1 });

    res.status(200).json(returns);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch return requests",
      error: error.message
    });
  }
};

const approveReturn = async (req, res) => {
  try {
    const returnRequest = await Return.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved"
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate("user", "name email phone")
      .populate("order");

    if (!returnRequest) {
      return res.status(404).json({
        message: "Return request not found"
      });
    }

    res.status(200).json({
      message: "Return request approved successfully",
      returnRequest
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to approve return request",
      error: error.message
    });
  }
};

const rejectReturn = async (req, res) => {
  try {
    const returnRequest = await Return.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected"
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate("user", "name email phone")
      .populate("order");

    if (!returnRequest) {
      return res.status(404).json({
        message: "Return request not found"
      });
    }

    res.status(200).json({
      message: "Return request rejected successfully",
      returnRequest
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to reject return request",
      error: error.message
    });
  }
};

module.exports = {
  getReturns,
  approveReturn,
  rejectReturn
};