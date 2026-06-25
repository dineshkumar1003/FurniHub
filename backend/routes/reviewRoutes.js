const express = require("express");

const router = express.Router();

const {
  createProductReview,
  getProductReviews,
} = require("../controllers/reviewController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Add Review
router.post(
  "/:id/reviews",
  protect,
  createProductReview
);

// Get Reviews
router.get(
  "/:id/reviews",
  getProductReviews
);

module.exports = router;