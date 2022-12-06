const User = require("../models/users");

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const isEmail = await User.findOne({
    email: { $regex: email, $options: "i" },
  });

  if (isEmail) {
    return res
      .status(401)
      .json({
        email: {
          message: "* Este email ya se encuentra registrado",
          status: 401,
        },
      });
  }

  next();
};

const validateUserName = async (req, res, next) => {
  const { userName } = req.body;

  const isUserName = await User.findOne({ userName });

  if (isUserName) {
    return res
      .status(401)
      .json({
        userName: {
          message: "* Este nombre de usuario ya existe",
          status: 401,
        },
      });
  }

  next();
};

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const isUserName = await User.findOne({ userName: name });

  if (isUserName) {
    return res
      .status(401)
      .json({
        userName: {
          message: "* Este nombre de usuario 123123 ya existe",
          status: 401,
        },
      });
  }

  next();
};

module.exports = { validateEmail, validateUserName, validateName };
