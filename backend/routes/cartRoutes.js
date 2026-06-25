const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQty,
  clearCart,
  getCartTotals,
  checkoutCart,
} = require("../controllers/cartController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Add Item To Cart
router.post(
  "/",
  protect,
  addToCart
);

// Get User Cart
router.get(
  "/",
  protect,
  getCart
);

//Get Cart Totals
router.get(
  "/totals",
  protect,
  getCartTotals
);

// Update Cart Quantity
router.put(
  "/:productId",
  protect,
  updateCartQty
);

//Check Out Cart
router.post(
  "/checkout",
  protect,
  checkoutCart
);

//Clear cart
router.delete(
  "/",
  protect,
  clearCart
);

// Remove Item From Cart
router.delete(
  "/:productId",
  protect,
  removeFromCart
);

module.exports = router;