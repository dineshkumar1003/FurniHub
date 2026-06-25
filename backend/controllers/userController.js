const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Login User
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid Email or Password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
};

// GET ALL USERS (ADMIN)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(
      "-password"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER BY ID (ADMIN)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE USER (ADMIN)
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (user) {
      user.name =
        req.body.name || user.name;

      user.email =
        req.body.email || user.email;

      user.isAdmin =
        req.body.isAdmin !== undefined
          ? req.body.isAdmin
          : user.isAdmin;

      console.log(
        "Before Save"
      );

      const updatedUser =
        await user.save();

      console.log(
        "After Save"
      );

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin:
          updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(
      "UPDATE USER ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};  

// DELETE USER (ADMIN)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (user) {
      await user.deleteOne();

      res.json({
        message: "User Removed",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};