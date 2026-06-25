const admin = (req, res, next) => {
  console.log("ADMIN MIDDLEWARE");

  console.log("req.user =", req.user);

  if (req.user && req.user.isAdmin) {
    return next();
  }

  return res.status(401).json({
    message: "Admin access only",
  });
};

module.exports = { admin };