const Queen = require("../models/queen");

const validateQueen = async (name) => {
  const isName = await Queen.findOne({ name: { $regex: name, $options: "i" } });

  if (isName) {
    return res.status(401).json({
      email: { message: "* ya se encuentra registrada", status: 401 },
    });
  }
};

module.exports = { validateQueen };
