const express = require("express");

const router = express.Router();

const upload =
  require("../config/multer");

router.post(
  "/",
  upload.single("image"),
  (req, res) => {
    res.json({
      image: `/uploads/${req.file.filename}`,
    });
  }
);

module.exports = router;