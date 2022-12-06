const express = require("express");
const router = express.Router();
const { jwtValidator } = require("../middleware/jwt");
const MercadoPago = require("../controllers/mercadoPago");
const mp = new MercadoPago();

router.post("/createPayment", jwtValidator, mp.createPay);

module.exports = router;
