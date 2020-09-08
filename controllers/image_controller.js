/* Imports */
const fs = require("fs");
const { imageUpload, deleteImageFromClient } = require("../config/cloudinary");
const { ownerValidation } = require("../helpers/validationChecks");
const { createImage, getImages, getUserImages, updateImage, getImage, deleteImage } = require("../db/image");

/* Insert images */
exports.postImages = async (req, res) => {
  const userId = req.user.dataValues.id;
  const files = req.files;

  const data = await Promise.all(
    files.map(async (file, i) => {
      const { path } = file;
      const { images } = JSON.parse(req.body.data);
      if (images && images.length > 0 && images[i]) {
        const { name, description, isPrivate, quantity, price, discountPercentage } = images[i];
        const imageRes = await imageUpload(path, "Images");
        try {
          const newImage = await createImage(
            userId,
            name,
            description,
            result.url,
            result.cloudinaryId,
            isPrivate,
            quantity,
            price,
            discountPercentage
          );
          return { name, id: newImage.id, url: imageRes.url };
        } catch (err) {
          res.status(500).json({ error: "Image and ID could not be saved in the dateabse.", name: name });
        }
        fs.unlinkSync(path);
      }
    })
  );

  res.status(200).json({
    message: "Successful Image(s) upload",
    data: data,
  });
};

/* Get all public images */
exports.getAllImages = async (req, res) => {
  const img = await getImages();
  if (img) {
    res.status(200).json({
      message: "Success: Public images retrieved",
      images: img,
    });
  } else {
    res.status(500).json({ error: "Unable to obtain all images" });
  }
};

/* Get all User images */
exports.getUserImages = async (req, res) => {
  const userId = req.user.dataValues.id;
  const imgs = await getUserImages(userId);
  if (imgs) {
    res.status(200).json({
      message: "Success: User images retrieved",
      images: imgs,
    });
  } else {
    res.status(500).json({ error: "Unable to obtain user images" });
  }
};


/* Update user images */
exports.patchImage = async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.dataValues.id;
  const imgOwner = await ownerValidation(userId, imageId);
  if (!imgOwner) {
    res.status(403).json({ error: "This image is owned by someone else." });
  }
  const updateRes = await updateImage(imageId, req.body);
  if (updateRes) {
    res.status(200).json({ message: "Image Update successful." });
  } else {
    res.status(500).json({ error: "Image Update unsuccessful." });
  }
};


/* GET Image */
exports.getImageDetails = async (req, res, next) => {
  const { imageId } = req.params;
  const userId = req.user.dataValues.id;
  const imgOwner = await ownerValidation(userId, imageId);
  if (!imgOwner) {
    res.status(403).json({ error: "This image is owned by someone else." });
  }
  const getRes = await getImage(imageId);
  if (getRes) {
    res.status(200).json({
      message: "Image retrived successfully.",
      image: getRes
    });
  } else {
    res.status(500).json({ error: "Image retrival unsuccessful." });
  }
};

/* Delete Image */
exports.deleteImages = async (req, res, next) => {
  const { imageIds } = req.body;
  const userId = req.user.dataValues.id;
  imageIds.forEach(async (id) => {
    const imgOwner = await ownerValidation(userId, imageId);
    if (!imgOwner) {
      res.status(403).json({ error: "This image is owned by someone else." });
    }
    try {
      const image = await getImage(id);
      await deleteImageFromClient(image.cloudinaryId);
      await deleteImage(id);
    } catch (err) {
      res.status(500).json({
        message: "Could not delete images",
      });
    }
  });
  res.status(200).json({ message: "Image deleted successfully." });
};

