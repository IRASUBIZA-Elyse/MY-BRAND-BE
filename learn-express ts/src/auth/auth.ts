import passport from "passport";
import UserModel from "../models/User";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

passport.use(
  "Signup",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "Login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        const validate: boolean = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user, { message: "logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  new JWTStrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
