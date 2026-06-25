const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
const createRazorpayOrder = async (
  req,
  res
) => {
  console.log(
    "REQ BODY =",
    req.body
  );

  try {
    const options = {
      amount:
        req.body.amount * 100,
      currency: "INR",
      receipt:
        `receipt_${Date.now()}`,
    };

    console.log(
      "RAZORPAY OPTIONS =",
      options
    );

    const order =
      await razorpay.orders.create(
        options
      );

    console.log(
      "RAZORPAY ORDER CREATED =",
      order
    );

    res.json(order);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        error.message,
    });
  }
};

// VERIFY PAYMENT
const verifyPayment = async (
  req,
  res
) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature ===
      razorpay_signature
    ) {
      const order =
        await Order.findById(orderId);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();

        await order.save();
      }

      return res.json({
        success: true,
        message:
          "Payment Verified Successfully",
      });
    }

    res.status(400).json({
      success: false,
      message: "Invalid Signature",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
}; 