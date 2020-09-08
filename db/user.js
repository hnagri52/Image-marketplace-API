const models = require("../models");

const getUser = (email) => {
  return models.User.findOne({
    where: {
      email,
    },
    attributes: ["id", "email", "firstName", "lastName"],
  });
};

const getUserHash = (email) => {
  return models.User.findOne({
    where: {
      email,
    },
  });
};

const createUser = (firstName, lastName, email, hashedPWD) => {
  return models.User.create({
    firstName,
    lastName,
    email,
    hashedPWD,
  });
};

module.exports = {
  getUser,
  createUser,
  getUserHash
};