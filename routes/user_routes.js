/* Imports */
var router = require("express").Router();
const users_controller = require("../controllers/users_controller");

/* Authorization routes. */
router.post("/register", users_controller.register);
router.post("/login", users_controller.login);

module.exports = router;