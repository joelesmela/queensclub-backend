const Galleries = require("../models/galleries");

const validateGalleries = async (galleryName) => {
  const isGallerie = await Galleries.findOne({
    galleryName: { $regex: galleryName, $options: "i" },
  });

  if (isGallerie) {
    throw new Error(`Nombre de galeria existente`);
  }
};

module.exports = { validateGalleries };
