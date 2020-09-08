/* Imports */
var router = require("express").Router();

/* GET Health check. */
router.get("/", function (req, res, next) {
  res.send("The API is healthy!");
});

module.exports = router;