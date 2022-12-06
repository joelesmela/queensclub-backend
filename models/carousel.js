const { Schema, model } = require("mongoose");

const carousel = new Schema({
  coverImageDesktop: String,
  coverImageMobile: String,
});

module.exports = model("Carousel", carousel);
