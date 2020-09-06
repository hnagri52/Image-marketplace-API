//imports
var express = require("express");
var router = express.Router();
const multerUpload = require("../middleware/multer");
const images = require("../controllers/image_controller");

/* POST Upload Image. */
router.post("/", multerUpload.array("image"), images.postImages);

module.exports = router;