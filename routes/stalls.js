const express = require("express");
const router = express.Router();
const Stall = require("../models/Stall");

// get all stalls from db
router.get("/", (req, res) => {
  Stall.find({}, (err, allStall) => {
    if (err) console.log(err);
    else {
      res.render("stalls/index", {
        allStall: allStall,
      });
    }
  });
});

router.get("/new", (req, res) => {
  res.render("stalls/newStall");
});

router.post("/new", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const desc = req.body.desc;
  const price = req.body.price;
  const newStall = { name, image, desc, price };
  Stall.create(newStall, (err, newlyStall) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Stall.findOne({ _id: id }, (err, foundStall) => {
    if (err) {
      console.log(err);
    } else {
      res.render("stalls/showDetails", {
        foundStall: foundStall,
      });
    }
  });
});

module.exports = router;
