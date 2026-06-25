const express = require("express");

const router = express.Router();

const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  trackOrder,
} = require("../controllers/orderController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

// Create Order
router.post(
  "/",
  protect,
  addOrderItems
);

// My Orders
router.get(
  "/myorders",
  protect,
  getMyOrders
);

// All Orders (Admin)
router.get(
  "/",
  protect,
  admin,
  getOrders
);

// Order By ID
router.get(
  "/:id",
  protect,
  getOrderById
);

// Track Order
router.get(
  "/:id/track",
  protect,
  trackOrder
);

// Mark Order Paid
router.put(
  "/:id/pay",
  protect,
  updateOrderToPaid
);

// Mark Order Delivered
router.put(
  "/:id/deliver",
  protect,
  admin,
  updateOrderToDelivered
);

// Update Order Status
router.put(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);

module.exports = router;