var express = require("express");
var router = express.Router();

/* GET users. */
router.get("/", function (req, res, next) {
  res.send("This will return a list of users");
});

module.exports = router;