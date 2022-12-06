const { validationResult } = require("express-validator");
const Queen = require("../models/queen");
const User = require("../models/users");
const bcrypt = require("bcrypt");

const createQueen = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Algo salió mal" });
  }
  try {
    const { name, lastName, coverImage, password, email, photoCarrusel } =
      req.body;

    const newQueen = await new Queen({
      name,
      coverImage,
      photoCarrusel,
    });
    const newUserQueen = await new User({
      email,
      userName: name,
      name,
      lastName,
      password,
      role: "queen",
    });
    const salt = bcrypt.genSaltSync();
    newUserQueen.password = bcrypt.hashSync(password, salt);
    await newUserQueen.save();
    await newQueen.save();
    res.status(200).json(`Queen created successfully`);
  } catch (error) {
    return res.status(404).json({
      message: "Cannot create Queen",
    });
  }
};

const getQueen = async (req, res) => {
  try {
    const { idQueen } = req.params;
    if (idQueen) {
      const queens = await Queen.find({ name: idQueen });
      res.status(200).json(queens);
    } else {
      const queens = await Queen.find({});
      res.status(200).json(queens);
    }
  } catch (error) {
    return res.status(404).json({
      message: "Cannot found any Queen",
    });
  }
};

const editQueen = async (req, res) => {
  const { name, coverImage } = req.body;
  try {
    await Queen.findByIdAndUpdate(req.params.queenId, {
      name,
      coverImage,
    });
    res.json(`Queen ${name} edited.`);
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const deleteQueen = async (req, res) => {
  const { id } = req.body;
  try {
    const queen = await Queen.findOneAndDelete({ _id: id });

    if (queen) {
      return res.status(200).json({
        mensaje: "Queen deleted succefully!",
      });
    }
    return res.status(404).json({
      mensaje: "Queen not found!",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Cannot delete Queen",
      error,
    });
  }
};

module.exports = { createQueen, getQueen, editQueen, deleteQueen };
