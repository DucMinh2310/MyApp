const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const app = express();

const User = require("./models/User");

mongoose.connect("mongodb://localhost/GoodFruit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

/* ========passport configuration========*/

app.use(
  expressSession({
    secret: "useless string",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// passport local mongoose
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ========================================*/

const dummy_arr = [
  {
    name: "this is a name",
    image:
      "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    description: "this is a desc",
  },
  {
    name: "this is a name 2",
    image:
      "https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    description: "this is a desc",
  },
];

app.get("/", (req, res) => {
  res.render("stalls/index", {
    allStall: dummy_arr,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
