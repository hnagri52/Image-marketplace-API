/* Imports */
const models = require("../models");
const Op = require("sequelize").Op;

/* Create Image Operation. */
const createImage = (userId, name, description = "", url, cloudinaryId, isPrivate = true, quantity = 0, price = 0, discountPercentage = 0) => {
  return models.Image.create({
    userId,
    name,
    description,
    url,
    cloudinaryId,
    isPrivate,
    quantity,
    price,
    discountPercentage,
  });
};

/* Get all Images Operation. */
const getImages = () => {
  return models.Image.findAll({
    where: {
      isPrivate: false,
    },
  });
};

/* Get User Images. */
const getUserImages = (userId) => {
  return models.Image.findAll({
    where: {
      userId,
    },
  });
};

/* Get Image by Image id. */
const getImage = (imageId) => {
  return models.Image.findOne({
    where: {
      id: imageId,
    },
  });
};

/* UPDATE image given its id. */
const updateImage = (imageId, updateBody) => {
  return models.Image.update(updateBody, {
    where: {
      id: imageId,
    },
  });
};

/* Delete image given its id. */
const deleteImage = (imageId) => {
  return models.Image.destroy({
    where: {
      id: imageId,
    },
  });
};

module.exports = {
  createImage,
  getImages,
  getUserImages,
  getImage,
  updateImage,
  deleteImage
};