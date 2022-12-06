const Carousel = require("../models/carousel");

const createCarouselIamge = async (req, res) => {
  const { coverImageDesktop, coverImageMobile } = req.body;
  try {
    const newPhoto = new Carousel({
      coverImageDesktop,
      coverImageMobile,
    });
    await newPhoto.save();
    res.json(`Photo created successfully`);
  } catch (error) {
    return res.status(400).json({
      message: "Cannot create Photo",
    });
  }
};

const getCarouselIamge = async (req, res) => {
  try {
    const carousel = await Carousel.find({});
    res.status(200).json(carousel);
  } catch (error) {
    return res.status(400).json({
      message: "Cannot found any Photo",
    });
  }
};

const editCarouselIamge = async (req, res) => {
  const { coverImageDesktop, coverImageMobile } = req.body;
  try {
    await Carousel.findByIdAndUpdate(req.params.carouselId, {
      coverImageDesktop,
      coverImageMobile,
    });
    res.json("Photo edited.");
  } catch (error) {
    return res.json({
      message: error,
    });
  }
};

const deleteCarouselIamge = async (req, res) => {
  const { id } = req.body;
  try {
    const carousel = Carousel.findOneAndDelete({ _id: id });

    if (carousel) {
      return res.status(200).json({
        mensaje: "Photo deleted succefully!",
      });
    }
    return res.status(400).json({
      mensaje: "Photo not found!",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Cannot delete Photo",
      error,
    });
  }
};

module.exports = {
  createCarouselIamge,
  getCarouselIamge,
  editCarouselIamge,
  deleteCarouselIamge,
};
