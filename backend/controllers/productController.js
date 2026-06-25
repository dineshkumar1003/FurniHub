const Product = require("../models/Product");

// GET PRODUCTS WITH SEARCH + FILTER + SORTING
const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const category = req.query.category
      ? {
          category: req.query.category,
        }
      : {};

    const minPrice = req.query.minPrice
      ? Number(req.query.minPrice)
      : 0;

    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : Number.MAX_SAFE_INTEGER;

    const filter = {
      ...keyword,
      ...category,
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    };

    let sortOption = {};

    if (req.query.sort === "price_asc") {
      sortOption = { price: 1 };
    } else if (
      req.query.sort === "price_desc"
    ) {
      sortOption = { price: -1 };
    } else if (
      req.query.sort === "rating"
    ) {
      sortOption = { rating: -1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    const products =
      await Product.find(filter).sort(
        sortOption
      );

    res.json({
      products,
      totalProducts:
        products.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE PRODUCT (ADMIN)
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: "Sample Product",
      image: "/images/sample.jpg",
      brand: "Sample Brand",
      category: "Sample Category",
      description: "Sample Description",
      price: 0,
      countInStock: 0,
      rating: 0,
      numReviews: 0,
    });

    const createdProduct =
      await product.save();

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT (ADMIN)
const updateProduct = async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (product) {
      product.name =
        req.body.name || product.name;

      product.price =
        req.body.price || product.price;

      product.brand =
        req.body.brand || product.brand;

      product.category =
        req.body.category ||
        product.category;

      product.countInStock =
        req.body.countInStock ||
        product.countInStock;

      product.description =
        req.body.description ||
        product.description;

      product.image =
        req.body.image || product.image;

      const updatedProduct =
        await product.save();

      res.json(updatedProduct);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT (ADMIN)
const deleteProduct = async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({
        message: "Product Removed",
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TOP RATED PRODUCTS
const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ rating: -1 })
      .limit(3);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Product Reviews & Ratings

const createProductReview = async (
  req,
  res
) => {
  try {
    const {
      rating,
      comment,
    } = req.body;

    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    const alreadyReviewed =
      product.reviews.find(
        (r) =>
          r.user.toString() ===
          req.user._id.toString()
      );

    if (alreadyReviewed) {
      return res.status(400).json({
        message:
          "Product already reviewed",
      });
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(
      review
    );

    product.numReviews =
      product.reviews.length;

    product.rating =
      product.reviews.reduce(
        (acc, item) =>
          item.rating + acc,
        0
      ) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message:
        "Review Added",
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopProducts,
  createProductReview,
};