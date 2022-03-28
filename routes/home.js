const express = require("express");
const router = express.Router();

// GET Home Page
router.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Home",
  });
});

module.exports = router;
