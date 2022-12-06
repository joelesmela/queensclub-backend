const Purchase = require("../models/purchase");
const Galeries = require("../models/galleries");
const mercadopago = require("mercadopago");
const paypal = require("@paypal/checkout-server-sdk");
const User = require("../models/users");
let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

// obtener todas las compras

const getPurchases = async (req, res) => {
  try {
    const purchase = await Purchase.find();
    res.json(purchase);
  } catch (error) {
    console.error(error);
  }
};

// obtener compras usarios o queen

const getUserOrQueenPurchase = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Purchase.find({ userId: userId });
    if (result.length === 0) {
      const result = await Purchase.find({ queenId: userId });
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(400).json({ error: "algo salio mal" });
  }
};

// obterner por id

const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const { id } = req.params;
    const respuesta = await Purchase.findById(id);
    res.json(respuesta);
  } catch (error) {
    res.json({ error: "compra no encontrada" });
  }
};

// obtener la galeria y imagenes si el usuario compro esa galeria devuelve todas las imagenes sino devuelve 4
const getGalleryPuchaseUser = async (req, res) => {
  try {
    const { userId, galleryName } = req.params;
    const userPurchase = await Purchase.findOne({
      userId: userId,
      available: true,
      galleryName: galleryName,
    });
    if (!userPurchase || userId == "undefined") {
      const galleryPhotos = await Galeries.findOne(
        { galleryName: galleryName },
        "photoBlur  photosShow numberPhotos galleryName idQueen price price_USD"
      );
      res.json(galleryPhotos);
    } else {
      const galleryPhotos = await Galeries.findOne(
        { galleryName: galleryName },
        "galleryName idQueen photos numberPhotos"
      );
      res.json(galleryPhotos);
    }
  } catch (error) {
    res.json({ error: "galeria no encontrada" });
  }
};

// crear compra mercadoPago

const createPaymentmercado = async (req, res) => {
  try {
    const { action } = req.body;
    if (action === "payment.updated") {
      const { id } = req.body.data;
      let compra = await mercadopago.payment.findById(id);
      const { status, status_detail } = compra.body;
      if (status === "approved" && status_detail === "accredited") {
        const { user_name, user_id, queen, price, gallery_name } =
          compra.body.metadata;
        const queenId = await User.findOne({ userName: queen }, "id");
        const { fee_details } = compra.body;
        const newPurchase = {
          queenId: queenId._id,
          userId: user_id,
          userName: user_name,
          galleryName: gallery_name,
          queen: queen,
          price: price,
          method: "mercado Pago",
          available: true,
          commission: fee_details[0].amount,
        };
        await Purchase.create(newPurchase);
        res.status(200).send("ok");
      }
    } else {
      res.status(200).send("ok");
    }
  } catch (error) {
    console.log(error);
  }
};

// crear compra paypal

const createPaymentpaypal = async (req, res) => {
  const { galleryName, queen, price_USD } = req.body;

  const queenId = await User.findOne({ userName: queen }, "id");

  try {
    const newPurchase = await new Purchase({
      queenId: queenId._id,
      userId: req.userId,
      userName: req.userName,
      galleryName: galleryName,
      queen: queen,
      price: price_USD,
      available: true,
      method: "PayPal",
    });
    await newPurchase.save();
    res.status(201);
  } catch (err) {
    console.log(err);
  }
};

const paypalOrder = async (req, res) => {
  const soli = new paypal.orders.OrdersCreateRequest();

  const { amounts } = req.body;

  soli.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: `${amounts}`,
        },
      },
    ],
  });
  const respo = await client.execute(soli);
  console.log(`Order: ${JSON.stringify(respo.result)}`);
  return res.json({ id: respo.result.id });
};

module.exports = {
  getPurchases,
  createPaymentmercado,
  getGalleryPuchaseUser,
  createPaymentpaypal,
  paypalOrder,
  getPurchaseById,
  getUserOrQueenPurchase,
};
