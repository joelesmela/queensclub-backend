const { Schema, model } = require("mongoose");

const galleries = new Schema({
  idQueen: String,
  galleryName: String,
  coverPhotoGallery: String,
  photoBlur: String,
  price: Number,
  price_USD: Number,
  photosShow: [String],
  photos: [String],
  numberPhotos: Number,
});

module.exports = model("Galleries", galleries);
