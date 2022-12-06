const { validationResult } = require("express-validator");
const Galleries = require("../models/galleries");

// obtener todas las galerias
const getGalleries = async (req, res) => {
  const galleries = await Galleries.find(
    {},
    "coverPhotoGallery idQueen galleryName numberPhotos price_USD price"
  );
  res.json(galleries);
};

// obtener las galerias para admin 

const getAdminGalleries = async (req , res ) =>{
  const galleries = await Galleries.find({})
  res.status(200).json(galleries)
}


// obtener galerias por id
const getGallerieById = async (req, res) => {
  const { id } = req.params;
  const galleries = await Galleries.findById(
    id,
    "coverPhotoGallery idQueen galleryName numberPhotos price_USD price"
  );
  res.json(galleries);
};

// galerias por queen
const getGallerieByQueen = async (req, res) => {
  const { queen } = req.params;
  const queenGalleries = await Galleries.find(
    { idQueen: queen },
    "coverPhotoGallery idQueen galleryName numberPhotos price_USD price"
  );
  res.json(queenGalleries);
};

// galerias por nombre Galeria
const getGallerieBygalleryName = async (req, res) => {
  const { queen, galleryName } = req.params;
  const gallery = await Galleries.find(
    { idQueen: queen, galleryName: galleryName },
    "coverPhotoGallery idQueen galleryName numberPhotos "
  );
  res.json(gallery);
};

// crear gallerias
const createGalleries = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Algo salió mal" });
  }
  const {
    idQueen,
    photosShow,
    photoBlur,
    galleryName,
    price,
    price_USD,
    coverPhotoGallery,
    photos,
  } = req.body;
  try {
    const newGallery = await new Galleries({
      idQueen,
      galleryName,
      coverPhotoGallery,
      photosShow,
      photoBlur,
      price,
      price_USD,
      photos,
      numberPhotos: photos.length,
    });

    await newGallery.save();
    res.json(`Gallery created successfully`);
  } catch (error) {
    return res.status(404).json({
      message: "Cannot create Gallery",
    });
  }
};

// modificar galeria
const updateGallerie = async (req, res) => {
  await Galleries.updateOne({ _id: req.body._id }, { $set: req.body });
  res.json({ message: "Gallery updated" });
};

// borrar galeria
const deleteGallerie = async (req, res) => {
  const { id } = req.params;
  await Galleries.findByIdAndDelete(id);
  res.json({ data: "Gallery deleted" });
};

module.exports = {
  createGalleries,
  getGallerieById,
  getAdminGalleries,
  getGallerieByQueen,
  getGalleries,
  getGallerieBygalleryName,
  deleteGallerie,
  updateGallerie,
};
