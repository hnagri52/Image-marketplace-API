const dotenv = require("dotenv").config();
const cloudinaryClient = require("cloudinary");

/* Setup config */
cloudinaryClient.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/* Upload Image to Cloudinary */
const imageUpload = (file, folder) => {
  return new Promise((resolve) => {
    cloudinaryClient.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        cloudinaryId: result.public_id,
      });
    },
      { resource_type: "auto", folder: folder }
    );
  });
};

/* Delete Image by ID from Cloudinarys */
const deleteImageFromClient = (id) => {
  return new Promise((resolve) => {
    cloudinaryClient.uploader.destroy(id, (result) => {
      resolve({ status: "Deleted" });
    });
  });
};

module.exports = {
  imageUpload,
  deleteImageFromClient
};