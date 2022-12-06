const { Router } = require("express");
const route = Router();
const { jwtValidator } = require("../middleware/jwt");
const { body } = require("express-validator");
const {
  createGalleries,
  getGallerieById,
  getGalleries,
  getGallerieByQueen,
  getGallerieBygalleryName,
  deleteGallerie,
  updateGallerie,
  getAdminGalleries,
} = require("../controllers/galleries");
const Galleries = require("../models/galleries");
const { validateGalleries } = require("../helpers/galleriesValidate");
const { isAdmin } = require("../middleware/isAdmin");

route
  // obtener todas las galerias
  .get("/", getGalleries)
  // obtener las galerias para el admin
  .get("/admin", jwtValidator , isAdmin ,getAdminGalleries )
  // galleries by ID
  .get("/id/:id", getGallerieById)
  // galleries by queen
  .get("/queen/:queen", getGallerieByQueen)
  // galleries by name
  .get("/:galleryName/:queen", getGallerieBygalleryName)
  // crear galeria
  .post(
    "/",
    body("idQueen"),
    body("galleryName")
      .trim()
      .escape()
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 30 }),
    body("galleryName").custom(validateGalleries),
    body("coverPhotoGallery"),
    body("[photosShow]"),
    body("photoBlur"),
    body("price").trim().escape().isNumeric().isLength({ min: 2, max: 6 }),
    body("price_USD").trim().escape().isNumeric().isLength({ min: 1, max: 6 }),
    body("[photos]"),
    isAdmin,
    createGalleries
  )

  .post("/updateGallerie", isAdmin, updateGallerie)
  // borrar galeria por id
  .delete("/delete/:id", isAdmin, deleteGallerie);

module.exports = route;
