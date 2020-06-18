const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

router.post("/register", (req, res) => {
  console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log("Loi: " + err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    }
  });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
