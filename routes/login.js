const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../database");

// GET Login Page
router.get("/", (req, res) => {
  res.render("pages/login", {
    title: "Login",
  });
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  let validationError = "";
  // All fields entered
  if (!email || !password) {
    validationError = "Please fill out all fields";
  }

  if (validationError.length > 0) {
    return res.render("pages/error", {
      error: validationError,
      title: "Invalid User",
    });
  }
  // 2. check if email already exists before checking password in database
  db.oneOrNone("SELECT * FROM users WHERE email = $1", [email])
    .then((user) => {
      // If user with that email already exists, render error
      if (!user) {
        res.render("pages/error", {
          error: "Invalid user",
          title: "Invalid User",
        });
      }
      // 3. Check if password is correct
      const databasePassword = user.password;
      const checkPassword = bcrypt.compareSync(password, databasePassword);
      if (!checkPassword) {
        res.render("pages/error", {
          error: "Invalid credentials",
          title: "Invalid credentials",
        });
      }
      // 4. user is valid!! track the user exists
      req.session.userId = user.id;
      req.session.name = user.firstname;
      return res.redirect("/");
    })
    .catch((error) => {
      res.render("pages/error", {
        error,
        title: "User",
      });
    });
});

module.exports = router;
