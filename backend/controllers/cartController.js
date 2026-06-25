const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const product = await Product.findById(
      productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        cartItems: [],
      });
    }

    const itemExists =
      cart.cartItems.find(
        (item) =>
          item.product.toString() ===
          productId
      );

    if (itemExists) {
      itemExists.qty += qty;
    } else {
      cart.cartItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.json({
        cartItems: [],
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE ITEM FROM CART
const removeFromCart = async (
  req,
  res
) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.cartItems =
      cart.cartItems.filter(
        (item) =>
          item.product.toString() !==
          req.params.productId
      );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE CART ITEM QUANTITY
const updateCartQty = async (req, res) => {
  try {
    const { qty } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    console.log("URL PRODUCT ID:", req.params.productId);

    console.log("CART ITEMS:");
    cart.cartItems.forEach((item) => {
      console.log(
        "PRODUCT:",
        item.product.toString()
      );
    });

    const item = cart.cartItems.find(
      (item) =>
        item.product.toString() ===
        req.params.productId
    );

    console.log("FOUND ITEM:", item);

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    item.qty = qty;

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CLEAR CART
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.cartItems = [];

    await cart.save();

    res.json({
      message: "Cart Cleared",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET CART TOTALS
const getCartTotals = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.json({
        itemsPrice: 0,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 0,
      });
    }

    const itemsPrice =
      cart.cartItems.reduce(
        (acc, item) =>
          acc + item.price * item.qty,
        0
      );

    const taxPrice =
      Number((itemsPrice * 0.18).toFixed(2));

    const shippingPrice =
      itemsPrice > 50000 ? 0 : 500;

    const totalPrice =
      itemsPrice +
      taxPrice +
      shippingPrice;

    res.json({
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CHECKOUT CART
const checkoutCart = async (req, res) => {
  try {
    const {
      shippingAddress,
      paymentMethod,
    } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (
      !cart ||
      cart.cartItems.length === 0
    ) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const itemsPrice =
      cart.cartItems.reduce(
        (acc, item) =>
          acc + item.price * item.qty,
        0
      );

    const taxPrice =
      Number((itemsPrice * 0.18).toFixed(2));

    const shippingPrice =
      itemsPrice > 50000 ? 0 : 500;

    const totalPrice =
      itemsPrice +
      taxPrice +
      shippingPrice;

    const order = new Order({
      user: req.user._id,

      orderItems: cart.cartItems,

      shippingAddress,

      paymentMethod,

      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder =
      await order.save();

    // Clear Cart After Checkout
    cart.cartItems = [];

    await cart.save();

    res.status(201).json({
      message:
        "Order Created Successfully",
      order: createdOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQty,
  clearCart,
  getCartTotals,
  checkoutCart,
};