//package imports
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();
require("./middleware/passport");


//route imports
var indexRouter = require("./routes/index_routes");
var usersRouter = require("./routes/users_routes");
var imagesRouter = require("./routes/image_routes");

//app setup
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//route definition
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/images", imagesRouter);

module.exports = app;