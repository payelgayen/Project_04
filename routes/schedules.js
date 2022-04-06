const express = require("express");
const db = require("../database");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { protectedRoute } = require("../middleware/protected");

router.get("/", protectedRoute, (req, res) => {
  db.any("SELECT * FROM schedule")
    .then((schedule) => {
        const id = req.params.userid;
        const userschedule = schedules.filter((x) => x.userid === parseInt(id));

      res.render("pages/userSchedule", {
        userschedule,
        title: "Schedules",
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

