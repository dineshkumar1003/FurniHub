const Order = require("../models/order");
const sendEmail = require("../utils/sendEmail");

// CREATE ORDER
const addOrderItems = async (req, res) => {
  try {
    console.log("ORDER BODY =", req.body);

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    const order = new Order({
      user: req.user._id,

      orderItems,
      shippingAddress,
      paymentMethod,

      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,

      isPaid: isPaid || false,
      paidAt: paidAt || null,

      orderStatus: "Placed",

      trackingHistory: [
        {
          status: "Placed",
          updatedAt: new Date(),
        },
      ],
    });

    console.log("ORDER BEFORE SAVE =", order);

    const createdOrder = await order.save();

    console.log("ORDER SAVED =", createdOrder);

    res.status(201).json(createdOrder);
  } catch (error) {
    console.log("ORDER ERROR =", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ORDER BY ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    ).populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// MARK ORDER PAID
const updateOrderToPaid = async (
  req,
  res
) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder =
      await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// MARK ORDER DELIVERED
const updateOrderToDelivered =
  async (req, res) => {
    try {
      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.orderStatus =
        "Delivered";

      const lastStatus =
        order.trackingHistory[
          order.trackingHistory.length - 1
        ]?.status;

      if (
        lastStatus !== "Delivered"
      ) {
        order.trackingHistory.push({
          status: "Delivered",
          updatedAt: new Date(),
        });
      }

      const updatedOrder =
        await order.save();

      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

// MY ORDERS
const getMyOrders = async (
  req,
  res
) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ALL ORDERS
const getOrders = async (
  req,
  res
) => {
  try {
    const orders = await Order.find({})
      .populate("user", "id name")
      .sort({
        createdAt: -1,
      });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS
const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const newStatus =
      req.body.orderStatus;

    if (!newStatus) {
      return res.status(400).json({
        message:
          "Order status is required",
      });
    }

    const lastStatus =
      order.trackingHistory[
        order.trackingHistory.length - 1
      ]?.status;

    order.orderStatus =
      newStatus;

    if (
      lastStatus !== newStatus
    ) {
      order.trackingHistory.push({
        status: newStatus,
        updatedAt: new Date(),
      });
    }

    if (
      newStatus === "Delivered"
    ) {
      order.isDelivered = true;
      order.deliveredAt =
        Date.now();
    }

    const updatedOrder =
      await order.save();

    try {
      await sendEmail(
        req.user.email,
        "Order Status Updated - FurniHub",
        `
Your order status has been updated.

Order ID:
${order._id}

New Status:
${newStatus}

Thank you for shopping with FurniHub.
        `
      );
    } catch (e) {
      console.log(
        "Email failed:",
        e.message
      );
    }

    res.json(updatedOrder);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// TRACK ORDER
const trackOrder = async (
  req,
  res
) => {
  try {
    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      orderId: order._id,
      orderStatus:
        order.orderStatus,
      trackingHistory:
        order.trackingHistory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  trackOrder,
};