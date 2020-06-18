const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const app = express();

const User = require("./models/User");

const authRoutes = require("./routes/auth");
const stallRoutes = require("./routes/stalls");

mongoose.connect("mongodb://localhost:27017/GoodFruit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

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

app.use(authRoutes);
app.use(stallRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
