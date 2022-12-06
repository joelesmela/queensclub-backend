const User = require("../models/users");

const userNameOrEmail = async (userName) => {
  const user = await User.findOne({ userName });
  if (user === null) {
    const user = await User.findOne({ email: userName });
    return user;
  }
  return user;
};

module.exports = { userNameOrEmail };
