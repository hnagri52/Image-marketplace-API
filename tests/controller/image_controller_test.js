var expect = require("chai").expect;
var image_controller = require("../../controllers/image_controller");
const response = require("node-mocks-http").createResponse();


describe("Image Controller", function () {
  const mockGetImages = {
    message: "Success: Public images retrieved",
    images: [
      {
        "0": {
          id: "e4b44edy-1981-7otd-9pft-546u739u4llr",
          userId: "e4b44edy-1981-7otd-9pft-546u739u4llr",
          name: "Hussein",
          description: "This is a description of a bag",
          url: "https://res.cloudinary.com/deedr05zo/image/upload/v1599424509/samples/ecommerce/leather-bag-gray.jpg",
          isPrivate: true,
          quantity: 4,
          price: 45.99,
          discountPercentage: 30,
          cloudinaryId: "Images/x7yt5yjh6gywer43pler",
          createdAt: "2020-09-03T11:22:53.654Z",
          updatedAt: "2020-09-03T11:39:28.435Z",
        },
      },
    ],
  };

  it("getAllImages", async function () {
    return new Promise(async (resolve) => {
      await image_controller.getAllImages(
        {},
        response
      );
      expect();
      resolve();
    });
  });
});	 