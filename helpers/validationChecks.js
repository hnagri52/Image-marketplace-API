const { getImages } = require("../db/image");

/* Returns whether user has given an appropriate email. */
const emailValidation = (emailAddress) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(emailAddress);

};

/* Returns whether user has given an appropriate password length */
const passwordValidation = (pwd) => {
  return pwd.length >= 6;
};

/* Returns whether user has image ownership */
const ownerValidation = async (userId, imageId) => {
  const imageObj = await getImages(imageId);
  return imageObj.userId == userId;
};

module.exports = {
  emailValidation,
  passwordValidation,
  ownerValidation
};

