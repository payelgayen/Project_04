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


router.get("/:userid/schedules", protectedRoute, (req, res) => {
  db.any("SELECT * FROM schedule")
    .then((schedule) => {
        const id = req.params.userid;
        const userschedule = schedule.filter((x) => x.user_id === id)
console.log(userschedule)
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
