var express = require("express");
var router = express.Router();
const users = require("../controllers/users_controller");


/* Authorization routes. */
router.post("/register", users.register);
router.post("/login", users.login);

module.exports = router;