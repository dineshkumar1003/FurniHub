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

// CREATE ORDER
router.post(
  "/",
  protect,
  addOrderItems
);

// GET MY ORDERS
router.get(
  "/myorders",
  protect,
  getMyOrders
);

// GET ALL ORDERS (ADMIN)
router.get(
  "/",
  protect,
  admin,
  getOrders
);

// TRACK ORDER
router.get(
  "/:id/track",
  protect,
  trackOrder
);

// GET ORDER BY ID
router.get(
  "/:id",
  protect,
  getOrderById
);

// MARK ORDER PAID
router.put(
  "/:id/pay",
  protect,
  updateOrderToPaid
);

// MARK ORDER DELIVERED
router.put(
  "/:id/deliver",
  protect,
  admin,
  updateOrderToDelivered
);

// UPDATE ORDER STATUS
router.put(
  "/:id/status",
  protect,
  admin,
  updateOrderStatus
);

module.exports = router;