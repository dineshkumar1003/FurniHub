const User = require("../models/User");

const getUsers = async (req, res) => {
  const users = await User.find({});

  res.json(users);
};

const updateUserRole = async (
  req,
  res
) => {
  const user =
    await User.findById(
      req.params.id
    );

  if (!user) {
    return res.status(404).json({
      message:
        "User not found",
    });
  }

  user.isAdmin =
    req.body.isAdmin;

  await user.save();

  res.json(user);
};

const deleteUser = async (
  req,
  res
) => {
  const user =
    await User.findById(
      req.params.id
    );

  if (!user) {
    return res.status(404).json({
      message:
        "User not found",
    });
  }

  await user.deleteOne();

  res.json({
    message:
      "User deleted",
  });
};

module.exports = {
  getUsers,
  updateUserRole,
  deleteUser,
};