const express =
  require("express");

const router =
  express.Router();

const {
  getUsers,
  updateUserRole,
  deleteUser,
} = require(
  "../controllers/userAdminController"
);

router.get(
  "/",
  getUsers
);

router.put(
  "/:id",
  updateUserRole
);

router.delete(
  "/:id",
  deleteUser
);

module.exports = router;