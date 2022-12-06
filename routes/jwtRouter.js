const { Router } = require("express");
const route = Router();
const {jwtValidator} = require('../middleware/jwt');

route.get("/", jwtValidator , (req , res) => res.status(200).send("ok"))

module.exports = route;