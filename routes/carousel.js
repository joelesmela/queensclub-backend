const { Router } = require("express");
const route = Router();
const {
  createCarouselIamge,
  getCarouselIamge,
  editCarouselIamge,
  deleteCarouselIamge,
} = require("../controllers/carousel");

route.get("/", getCarouselIamge);

route.post("/", createCarouselIamge);

route.put("/:carouselId", editCarouselIamge);

route.delete("/", deleteCarouselIamge);

module.exports = route;
