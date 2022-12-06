require("dotenv").config();
const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose
      .connect(process.env.MQCDB)
      .then(console.log("Conexión Exitosa"));
  } catch (error) {
    console.log(error);
  }
};

connectionDB();
module.exports = { connectionDB };
