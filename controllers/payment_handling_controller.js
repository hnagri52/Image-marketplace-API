const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { createImage, getImage } = require("../db/image");


exports.purchase = async (req, res) => {
  const { imageId, quantity } = req.body;
  const img = await getImage(imageId);

  if (quantity > img.quantity || img.userId == req.user.dataValues.id) {
    res.status(400).json({ error: "Invalid quantity or user" });
  }
  stripe.charges.create(
    {
      amount: 100,
      currency: "cad",
      source: "tok_visa",
      description: "Payment Description",
    },
    async (err) => {
      if (err) {
        res.status(500).json({ error: "Could not process payment" });
      } else {
        await createImage(
          req.user.dataValues.id,
          img.name,
          img.description,
          img.url,
          img.cloudinaryId,
          img.isPrivate,
          quantity,
          img.price,
          img.discountPercentage
        );
        res.status(200).json({
          message: "Image purchase successful",
        });
      }
    }
  );
};