/* package imports */
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dotenv = require("dotenv");
dotenv.config();
require("./middleware/passport");


/* route imports */
var healthRoutes = require("./routes/health_route");
var userRoutes = require("./routes/user_routes");
var imageRoutes = require("./routes/image_routes");
var paymentRoute = require("./routes/payment_handling_routes");


/* app setup */
var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* route definition */
app.use("/", healthRoutes);
app.use("/users", userRoutes);
app.use("/images", imageRoutes);
app.use("/payment", paymentRoute);

module.exports = app;