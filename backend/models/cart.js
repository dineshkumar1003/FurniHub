const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    qty: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const cartSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cartItems: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Cart",
  cartSchema
);  