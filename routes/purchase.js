const { Router } = require("express");
const route = Router();
const { jwtValidator } = require("../middleware/jwt");
const {
  getPurchases,
  getUserOrQueenPurchase,
  createPaymentmercado,
  getGalleryPuchaseUser,
  createPaymentpaypal,
  paypalOrder,
  getPurchaseById,
} = require("../controllers/purchase");
const { isAdmin } = require("../middleware/isAdmin");

const Purchase = require("../models/purchase");

route
  .get("/", isAdmin, getPurchases)
  .get("/user/:userId/:galleryName", getGalleryPuchaseUser)
  .get("/:userId", jwtValidator, getUserOrQueenPurchase)
  .get("/id/:id", isAdmin, getPurchaseById)
  .post("/paypalIpn", jwtValidator, createPaymentpaypal)
  .post("/ipn", createPaymentmercado)
  .post("/paypal", jwtValidator, paypalOrder)
  .post("/pruebaMP" , (req , res) =>{ res.status(200).send("ok")})
module.exports = route;
