const express = require("express");
// const db = require('../database');
//const bcrypt = require("bcryptjs");
const router = express.Router();

// GET all users
app.get('/users', (req,res) => {
  db.any('SELECT * FROM users')
  .then((users) => {
      // if success;
      console.log(users)

      res.render('pages/users',
      {users,
      title: 'ALL Users'})
  })
  .catch((error) => {
      // error;
      console.log(error)
      res.redirect("/error?message=" + error.message)
  });
});

// GET specific users
router.get("/:user_id", (req, res) => {
  const index = req.params.user_id;
  db.oneOrNone("SELECT * FROM users WHERE id = $1", [index]);
  // const user = users[index];
  //then;



db.any('SELECT * FROM users')
.then((users) => {
  // if success;
const index = req.params.user_id;
const user = users[index];

// validation to confirm number has been entered
if (index >= users.length) {
  res.status(400).send(`msg: User ${index} is not found`);
}
res.render('pages/user', {user, title: 'User' })

})
.catch((error) => {
// error;
console.log(error)
res.redirect("/error?message=" + error.message)
});
});

module.exports = router;
