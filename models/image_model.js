"use strict";

/* DB Image model */
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: DataTypes.UUID,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      isPrivate: DataTypes.BOOLEAN,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      discountPercentage: DataTypes.FLOAT,
      cloudinaryId: DataTypes.STRING,
    },
    {}
  );
  Image.associate = function (models) { };
  return Image;
};