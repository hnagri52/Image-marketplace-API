/* Imports */
const payment_controller = require("../controllers/payment_handling_controller");
var passportAuth = require("passport");
var router = require("express").Router();
require("../middleware/passport");


/* POST Authenticate Purchase. */
router.post("/", passportAuth.authenticate("jwt", { session: false }), payment_controller.purchase);

module.exports = router;