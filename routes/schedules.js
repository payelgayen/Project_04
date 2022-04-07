const express = require("express");
const db = require("../database");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { protectedRoute } = require("../middleware/protected");


router.get('/', protectedRoute, (req, res) => {
  // pg-promise
  db.any('SELECT * FROM schedule')
    .then((schedules) => {
      // if success;
      console.log(schedules);

      res.render('pages/schedules', { 
        schedules, 
        title: 'ALL schedules',
        footerclass: "absolutefooter",
        req: req,
        res: res });
    })
    .catch((error) => {
      // error;
      console.log(error);
      res.redirect('/error?message=' + error.message);
    });
});




module.exports = router;

