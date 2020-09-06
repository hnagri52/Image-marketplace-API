var express = require("express");
var router = express.Router();

/* GET Health check. */
router.get("/", function (req, res, next) {
  res.send("Welcome to the Image Repository API");
});

module.exports = router;