const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcrypt");
const { getUser, getUserHash } = require("../db/user");

const secretKey = process.env.JWT_SECRET;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await getUserHash(email);
        const passwordsMatch = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (passwordsMatch) {
          return done(null, user);
        } else {
          return done("Incorrect email or password provided");
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: (req) => ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    },
    async (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done("Provided JWT has expired");
      }

      try {
        const user = await getUser(jwtPayload.username);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
