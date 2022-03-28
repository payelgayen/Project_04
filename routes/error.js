const express = require("express");
const router = express.Router();

// GET home page
router.get("*", (req, res) => {
  res.render("pages/error", { title: "404", error: "404" });
});

module.exports = router;
