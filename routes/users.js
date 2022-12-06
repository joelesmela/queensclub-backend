const { Router } = require("express");
const route = Router();
const { body } = require("express-validator");
const {
  createUser,
  deleteUser,
  getUsers,
  getInfoUser,
  editUser,
} = require("../controllers/users");
const { validateEmail, validateUserName } = require("../helpers/validation");
const { jwtValidator } = require("../middleware/jwt");
const { isAdmin } = require("../middleware/isAdmin");

route
.get("/", isAdmin, getUsers)
.get("/:userId", jwtValidator, getInfoUser)
.post(
  "/",
  body("email").trim().escape().isEmail().not().isEmpty(),
  body("userName")
    .trim()
    .escape()
    .isAlphanumeric()
    .isLength({ min: 4, max: 15 })
    .not()
    .isEmpty(),
  body("name")
    .trim()
    .escape()
    .isAlpha("es-ES", { ignore: " " })
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 25 }),
  body("lastName")
    .trim()
    .escape()
    .isAlpha("es-ES", { ignore: " " })
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 25 }),
  body("password").not().isEmpty().isStrongPassword({ minSymbols: 0 }),
  validateEmail,
  validateUserName,
  createUser
)
.post(
  "/changepassword",
  body("email").trim().escape().isEmail().not().isEmpty(),
  body("userName")
    .trim()
    .escape()
    .isAlphanumeric()
    .isLength({ min: 4, max: 15 })
    .not()
    .isEmpty(),
  body("name")
    .trim()
    .escape()
    .isAlpha("es-ES", { ignore: " " })
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 25 }),
  body("lastName")
    .trim()
    .escape()
    .isAlpha("es-ES", { ignore: " " })
    .not()
    .isLength({ min: 0, max: 25 }),
  body("password").not().isEmpty().isStrongPassword({ minSymbols: 0 }),
  jwtValidator,
  editUser
);
route.delete("/:id", isAdmin, deleteUser);




module.exports = route;
