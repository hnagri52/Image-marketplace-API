/* Imports */
const uploadMulter = require("../middleware/multer");
var passportAuth = require("passport");
const images = require("../controllers/image_controller");


require("../middleware/passport");
var router = require("express").Router();

/* GET Retrieve all images. */
router.get("/", images.getAllImages);

/* GET Retrieve all user images. */
router.get("/private", passportAuth.authenticate("jwt", { session: false }), images.getUserImages);

/* GET Image by ID. */
router.get("/:imageId", passportAuth.authenticate("jwt", { session: false }), images.getImageDetails);

/* PATCH update image by id. */
router.patch("/:imageId", passportAuth.authenticate("jwt", { session: false }), images.patchImage);

/* POST Upload Image. */
router.post("/", passportAuth.authenticate("jwt", { session: false }), uploadMulter.array("image"), images.postImages);

/* DELETE Image. */
router.delete("/", passportAuth.authenticate("jwt", { session: false }), images.deleteImages);

module.exports = router;
