const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  createProductReview,
} = require("../controllers/productController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  admin,
} = require("../middleware/adminMiddleware");

// Top Products
router.get(
  "/top",
  getTopProducts
);

// All Products
router.get(
  "/",
  getProducts
);

// Product By ID
router.get(
  "/:id",
  getProductById
);

// Admin Create Product
router.post(
  "/",
  protect,
  admin,
  createProduct
);

// Admin Update Product
router.put(
  "/:id",
  protect,
  admin,
  updateProduct
);

// Admin Delete Product
router.delete(
  "/:id",
  protect,
  admin,
  deleteProduct
);

// Product Reviews & Ratings
router.post(
  "/:id/reviews",
  protect,
  createProductReview
);

module.exports = router;