require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { userNameOrEmail } = require("../helpers/loginValidate");
const token_secret = process.env.TOKEN_SECRET;

const login = async (req, res) => {
  const { user, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Algo salió mal", status: 400 });
  }
  

  const userData = await userNameOrEmail(user);

  if (!userData) {
    res.status(400).send({ mensaje: "Algo salio mal", status: 400 });
    return;
  }

  try {
    const match = await bcrypt.compare(password, userData.password);
    const payload = {
      userId: userData._id,
      email: userData.email,
      role: userData.role,
      userName: userData.userName,
    };
    const accessToken = jwt.sign(payload, token_secret, { expiresIn: "24h" });

    if (match) {
      res.status(200).json({
        mensaje: "Autentificación exitosa",
        name: userData.userName,
        accessToken: accessToken,
      });
    } else {
      res
        .status(400)
        .json({ mensaje: "Error: credenciales incorrectas", status: 400 });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { login };
