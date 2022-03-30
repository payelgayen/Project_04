
const express = require('express')
const db = require('../database');
const bcrypt = require('bcryptjs');
const router = express.Router()

const { protectedRoute } = require('../middleware/protected');


// GET all users
router.get('/users', protectedRoute, (req, res) => {
  // pg-promise
  db.any('SELECT * FROM users')
    .then((users) => {
      // if success;
      console.log(users);

      res.render('pages/users', { users, title: 'ALL users' });
    })
    .catch((error) => {
      // error;
      console.log(error);
      res.redirect('/error?message=' + error.message);
    });
});

module.exports = router;