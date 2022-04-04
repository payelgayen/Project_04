const express = require("express");
const db = require("../database");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { protectedRoute } = require("../middleware/protected");

router.get("/", protectedRoute, (req, res) => {
  db.any("SELECT * FROM users")
    .then((users) => {
      res.render("pages/allUsers", {
        users,
        title: "ALL users",
        footerclass: "absolutefooter",
        req: req,
        res: res,
      });
    })
    .catch((error) => {
      res.redirect("/error?message=" + error.message);
    });
});

module.exports = router;
