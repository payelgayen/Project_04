const express = require("express");
const db = require("../database");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// GET - signup form
router
  .route("/")
  .get((req, res) => res.render("pages/signup", { title: "Add User" }));

// POST - signup new user
router.post("/", (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;

  let validationError = "";

  if (!firstname || !lastname || !email || !password || !confirmPassword) {
    validationError = "Please fill out all fields";
  } else if (password !== confirmPassword) {
    validationError = "Password does not match";
  }

  if (validationError.length > 0) {
    return res.render("pages/error", {
      error: validationError,
      title: "Invalid User",
    });
  }

  const cleanedEmail = email.toLowerCase().trim();

  //  if email already exists before inserting

  db.oneOrNone("SELECT * FROM users WHERE email = $1", [cleanedEmail])
    .then((user) => {
      // If user with that email already exists, render error
      if (user) {
        res.render("pages/error", {
          error: "User already exists",
          title: "Invalid User",
        });

        // if all valid and email doesn't already exist, hash password and insert into db
      } else {
        // Encrypt the password with bcryptJS
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        // Insert into DB
        db.none(
          "INSERT INTO users(id, firstname, lastname, email, password) VALUES($1, $2, $3, $4, $5)",
          [uuidv4(), firstname, lastname, cleanedEmail, hash]
        )
          .then(() => {
            res.redirect("/users");
          })
          .catch((error) => {
            res.render("pages/error", {
              error: "User cannot be added",
              title: "User",
            });
          });
      }
    })
    .catch((error) => {
      res.render("pages/error", {
        error,
        title: "User",
      });
    });
});

module.exports = router;
