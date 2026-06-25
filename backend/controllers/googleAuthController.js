const admin = require("../config/firebaseAdmin");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const googleLogin = async (
  req,
  res
) => {
  try {
    const { token } = req.body;

    const decoded =
      await admin
        .auth()
        .verifyIdToken(token);

    const {
      email,
      name,
    } = decoded;

    let user =
      await User.findOne({
        email,
      });

    if (!user) {
      user =
        await User.create({
          name:
            name ||
            "Google User",
          email,
          password:
            Math.random()
              .toString(36)
              .slice(-8),
        });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin:
        user.isAdmin,
      token:
        generateToken(
          user._id
        ),
    });
  } catch (error) {
    res.status(401).json({
      message:
        "Google authentication failed",
    });
  }
};

module.exports = {
  googleLogin,
};