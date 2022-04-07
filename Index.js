//--- Express module
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
// ---Initialise express server
const app = express();
// -- create port variable
const port = process.env.PORT || 3000;

//import libraries and data
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");

//---middleware
// Session
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    name: "mrcoffee_sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);

// Logger
app.use(morgan("dev"));

//bodypaser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//ejs config
app.set("view engine", "ejs"); // sets ejs as view engine
app.set("views", "./views"); // sets 'views' folder as teh folder for grabbing templates when res.rendering

// Routes
// import route files
const homeRouter = require("./routes/home.js");
app.use("/", homeRouter);

const usersRouter = require("./routes/users.js");
app.use("/users", usersRouter);

const schedulesRouter = require("./routes/schedules.js");
app.use("/schedules", schedulesRouter);

const signupRouter = require("./routes/signup.js");
app.use("/signup", signupRouter);

const loginRouter = require("./routes/login.js");
app.use("/login", loginRouter);

const logoutRouter = require("./routes/logout.js");
app.use("/logout", logoutRouter);

// const postsRouter = require("./routes/posts.js");
// app.use("/posts", postsRouter);

const errorRouter = require("./routes/error.js");
app.use("*", errorRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
