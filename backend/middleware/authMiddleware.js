const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token =
        req.headers.authorization.split(
          " "
        )[1];

      console.log(
        "TOKEN:",
        token
      );

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      console.log(
        "DECODED:",
        decoded
      );

      console.log(
        "COLLECTION:",
        User.collection.name
      );

      const allUsers =
        await User.find({});

      console.log(
        "ALL USERS:",
        allUsers
      );

      const foundUser =
        await User.findById(
          decoded.id
        );

      console.log(
        "FOUND USER =",
        foundUser
      );

      req.user = foundUser
        ? foundUser.toObject()
        : null;

      console.log(
        "USER:",
        req.user
      );

      next();
    } catch (error) {
      console.log(
        "JWT ERROR:",
        error.message
      );

      return res.status(401).json({
        message:
          "Not Authorized",
        error:
          error.message,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No Token",
    });
  }
};

module.exports = {
  protect,
};