require("dotenv").config();
const jwt = require("jsonwebtoken");

const token_secret = process.env.TOKEN_SECRET;

const jwtValidator = async (req, res, next) => {
  const accessToken = req.headers["accesstoken"];
  try {
    const decode = jwt.verify(accessToken, token_secret);
    req.userId = decode.userId;
    req.userEmail = decode.email;
    req.userName = decode.userName;
    req.role = decode.role;
    if (decode) {
      return next();
    }
    return res.status(401).json({
      message: "debes estar logueado para tener acceso",
    });
  } catch (error) {
    res.status(401).json({
      message: "debes estar logueado para tener acceso",
    });
  }
};

module.exports = { jwtValidator };
