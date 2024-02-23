import { Response, Request, NextFunction } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUser } from "../models/User";
import { Error } from "mongoose";
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: IUser, info: any) => {
      if (err) {
        return res
          .status(400)
          .send({ data: [], message: "error", error: err.message });
      }
      if (!user) {
        return res
          .status(400)
          .send({ data: [], message: "Not authorized", error: null });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.send("not authorized");
  }
  if (!("role" in req.user)) {
    return res.send("role not provided");
  }
  if (req.user.role == "admin") {
    next();
  } else {
    return res.send("unauthorized content ..");
  }
};
