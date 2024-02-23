import passport from "passport";
import User, { userInterface } from "../models/userModel";
import { ExtractJwt, VerifiedCallback, Strategy } from "passport-jwt";

passport.use(
  new Strategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload: { user: userInterface }, done: VerifiedCallback) => {
      try {
        return done(null, payload.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
