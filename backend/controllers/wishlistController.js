const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// ADD TO WISHLIST
const addToWishlist = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.productId
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let wishlist =
      await Wishlist.findOne({
        user: req.user._id,
      });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: [],
      });
    }

    const exists =
      wishlist.products.includes(
        req.params.productId
      );

    if (exists) {
      return res.status(400).json({
        message:
          "Already in wishlist",
      });
    }

    wishlist.products.push(
      req.params.productId
    );

    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET WISHLIST
const getWishlist = async (
  req,
  res
) => {
  try {
    const wishlist =
      await Wishlist.findOne({
        user: req.user._id,
      }).populate("products");

    res.json(
      wishlist || { products: [] }
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// REMOVE FROM WISHLIST
const removeFromWishlist =
  async (req, res) => {
    try {
      const wishlist =
        await Wishlist.findOne({
          user: req.user._id,
        });

      if (!wishlist) {
        return res.status(404).json({
          message:
            "Wishlist not found",
        });
      }

      wishlist.products =
        wishlist.products.filter(
          (p) =>
            p.toString() !==
            req.params.productId
        );

      await wishlist.save();

      res.json(wishlist);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};