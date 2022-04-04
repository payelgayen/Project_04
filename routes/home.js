const express = require("express");
const router = express.Router();
const db = require("../database");

const { protectedRoute } = require("../middleware/protected");

// GET Home Page
router.get("/", protectedRoute, async (req, res) => {
  //using async to use await inside the function
  let schedule;
  let allusers;
  try {
    schedule = await db.any(
      "select * from schedule, users where schedule.user_id=users.id"
    ); //Retrieving all the data from both users and schedule tables

    allusers = await db.any("SELECT * FROM users");
  } catch (e) {
    //To catch the exception
    console.log(e);
    allusers = [];
    schedule = []; //If any exception occurs, then setting schedule with empty array
  }
  res.render("pages/schedules", {
    schedules: schedule,
    allusers: allusers,
    title: "Home",
    footerclass: "absolutefooter",
    req: req,
    res: res,
  });
});

// Add a new schedule
router.post("/schedule", protectedRoute, (req, res) => {
  const { user_id, day, start_at, end_at } = req.body;
  db.none(
    "INSERT INTO schedule(user_id, day, start_time, end_time) VALUES($1, $2, $3, $4)",
    [user_id, day, start_at, end_at]
  )
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
