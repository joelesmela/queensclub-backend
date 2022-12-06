const { Router } = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/login");

const route = Router();

route.post(
  "/",
  body("email").trim().escape(),
  body("userName").trim().escape(),
  body("password").not().isEmpty(),
  login
);

module.exports = route;
