//imports
var express = require("express");
var router = express.Router();
const multerUpload = require("../middleware/multer");
const images = require("../controllers/image_controller");

/* GET Retrieve all images. */
router.get("/", images.getAllImages);

/* GET Retrieve all user images. */
router.get("/:userId", images.getUserImages);

/* POST Upload Image. */
router.post("/", multerUpload.array("image"), images.postImages);

module.exports = router;