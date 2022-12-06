const { Schema, model } = require("mongoose");

const purchase = new Schema(
  {
    queenId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    galleryName: {
      type: String,
      required: true,
    },
    queen: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
    },
    commission: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
module.exports = model("purchase", purchase);
