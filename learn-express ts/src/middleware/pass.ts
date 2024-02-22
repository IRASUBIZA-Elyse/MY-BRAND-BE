import { Model, Document } from "mongoose";
import passport from "passport";
import config from "../tools/config";
import passportJWT, { ExtractJwt, Strategy } from "passport-jwt";
import User from "../models/User";

const OtherExtractJwt = passportJWT.ExtractJwt;
const OtherStrategy = passportJWT.Strategy;

const params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
