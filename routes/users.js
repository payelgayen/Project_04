const express = require("express");
// const db = require('../database');
//const bcrypt = require("bcryptjs");
const router = express.Router();

// GET all users
router.get("/", (req, res) => {});

// GET specific users
router.get("/:user_id", (req, res) => {
  const index = req.params.user_id;
  db.oneOrNone("SELECT * FROM users WHERE id = $1", [index]);
  // const user = users[index];
  //then;
});

module.exports = router;
