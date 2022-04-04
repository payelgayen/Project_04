const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // remove the entire session
  req.session.destroy((err) => {
    if (err) {
      res.render("pages/error", {
        error: err.message,
        title: "Cannot logout",
      });
    } else {
      console.log("logged out");
      // clear the cookie
      res.clearCookie("mrcoffee_sid");
      // redrirect to login
      res.redirect("/login");
    }
  });
});

module.exports = router;
