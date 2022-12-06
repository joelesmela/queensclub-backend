const { Schema, model } = require("mongoose");

const user = new Schema({
  email: String,
  userName: String,
  name: String,
  lastName: String,
  password: String,
  role: String,
});

module.exports = model("User", user);
