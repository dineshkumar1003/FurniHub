const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); 
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ADD THIS
app.use(
  "/images",
  express.static(
    path.join(__dirname, "images")
  )
);
//admin image upload
app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "/uploads"
    )
  )
);

app.use(
  "/api/upload",
  require("./routes/uploadRoutes")
);

// Routes
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const adminRoutes =  require("./routes/adminRoutes");
const otpRoutes =  require("./routes/otpRoutes");

// Product Routes
app.use("/api/products", productRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Review Routes
app.use("/api/reviews", reviewRoutes);

// Payment Routes
app.use("/api/payment", paymentRoutes);

// Cart Routes
app.use("/api/cart", cartRoutes);

// Wish list Routes
app.use("/api/wishlist", wishlistRoutes);

// Admin User Management
app.use(
  "/api/admin/users",
  require(
    "./routes/adminUserRoutes"
  )
);

//Admin Routes + googleAuth
app.use( "/api/admin",adminRoutes);
app.use(
  "/api/auth",
  require(
    "./routes/googleAuthRoutes"
  )
);

//Admin Dashboard Controller
app.use(
  "/api/admin/dashboard",
  require(
    "./routes/adminDashboardRoutes"
  )
);

//Otp Routes
app.use("/api/otp", otpRoutes);

// Home Route
app.get("/", (req, res) => { res.send("FurniHub API Running...");});

// Test Route
app.get("/api/test", (req, res) => {res.json({message: "Server Working Successfully",});});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});