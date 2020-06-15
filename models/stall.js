const mongoose = require("mongoose");

const stallSchema = mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: String,
});

module.exports = mongoose.model("Stall", stallSchema);
