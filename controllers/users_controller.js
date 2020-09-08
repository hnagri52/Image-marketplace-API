const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser, createUser } = require("../db/user");
const { emailValidation, passwordValidation } = require("../helpers/validationChecks");

/* Register User */
exports.register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!emailValidation(email) || !passwordValidation(password)) {
    return res.status(400).json({
      error: "Please use valid email and password inputs",
    });
  }
  try {
    const hashedPWD = await bcrypt.hash(password, 7);
    const registeredUser = await getUser(email);

    if (registeredUser) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }

    const createdUser = await createUser(firstName, lastName, email, hashedPWD);

    res.status(200).send({
      message: "User created successfully",
      user: {
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
      },
    });
  } catch (err) {
    return res.status(400).json({
      error: "Unable to register user",
    });
  }
};

/* Log in User */
exports.login = async (req, res, next) => {
  // Login authenticate with Local Strategy, will return a jwt
  passport.authenticate("local", { session: false }, (err, user) => {
    if (!user || err) {
      res.status(400).json({ error: "Account does not exist, please register first" });
    }
    const jwtPayload = {
      username: user.email,
      id: user.id,
      expires: Date.now() + parseInt(process.env.JWT_EXPIRY_TIME_MS),
    };
    req.login(jwtPayload, { session: false }, (err) => {
      if (err) {
        res.sendStatus(400).send({ error: err });
      }
      const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET);
      res.status(200).send({ message: "Log in successful", token: jwtToken });
    });
  })(req, res);
};