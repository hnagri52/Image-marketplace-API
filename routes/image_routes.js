//imports
var express = require("express");
var router = express.Router();
const multerUpload = require("../middleware/multer");
const images = require("../controllers/image_controller");
var passport = require("passport");
require("../middleware/passport");

/* GET Retrieve all images. */
router.get("/", images.getAllImages);

/* GET Retrieve all user images. */
router.get("/private", passport.authenticate("jwt", { session: false }), images.getUserImages);

/* GET Image by ID. */
router.get("/:imageId", passport.authenticate("jwt", { session: false }), images.getImageDetails);

/* PATCH update image by id. */
router.patch("/:imageId", passport.authenticate("jwt", { session: false }), images.patchImage);

/* POST Upload Image. */
router.post("/", passport.authenticate("jwt", { session: false }), multerUpload.array("image"), images.postImages);

/* DELETE Image. */
router.delete("/", passport.authenticate("jwt", { session: false }), images.deleteImages);

/* GET search for Image. */
router.get("/search", images.searchImages);

module.exports = router;
