const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/order");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalProducts =
      await Product.countDocuments();

    const totalUsers =
      await User.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const orders =
      await Order.find();

    const revenue =
      orders.reduce(
        (acc, order) =>
          acc + order.totalPrice,
        0
      );

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to load dashboard",
    });
  }
};

module.exports = {
  getDashboardStats,
};