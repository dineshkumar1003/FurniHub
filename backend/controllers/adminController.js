const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalOrders =
      await Order.countDocuments();

    const paidOrders =
      await Order.countDocuments({
        isPaid: true,
      });

    const pendingOrders =
      await Order.countDocuments({
        isPaid: false,
      });

    const orders = await Order.find()
      .populate(
        "user",
        "name email"
      )
      .sort({ createdAt: -1 });

    const totalRevenue =
      orders.reduce(
        (acc, order) =>
          acc + order.totalPrice,
        0
      );

    const averageOrderValue =
      totalOrders > 0
        ? (
            totalRevenue /
            totalOrders
          ).toFixed(2)
        : 0;

    const recentOrders =
      orders.slice(0, 5);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      paidOrders,
      pendingOrders,
      totalRevenue,
      averageOrderValue,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};