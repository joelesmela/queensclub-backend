require("dotenv").config();
const jwt = require("jsonwebtoken");

const token_secret = process.env.TOKEN_SECRET;

const isAdmin = async (req, res, next) => {
  const accessToken = req.headers["accesstoken"];
  try {
    const decode = jwt.verify(accessToken, token_secret);
    if (decode.role === "admin") {
      next();
    } else {
      res.status(401).json({ error: "no tiene acceso" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { isAdmin };
